import { v4 as uuidv4 } from "uuid";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { addMessageAction, canLoadHistoryAtom, isLoadingAtom, resetAction } from "@/stores";
import { ctx } from "@/stores/ctx";
import { ERoles, type IMessage, type TReaction } from "@/types";
import { Client, type Message } from "@stomp/stompjs";

import { Chat, type Chat as TChat } from "./chat";
import type { ISendActionProps } from "./types";

vi.mock("uuid");
vi.mock("@stomp/stompjs");
vi.mock("@/helpers/cookie", () => ({
	getCookie: vi.fn().mockReturnValue("mock-session-id"),
}));
vi.mock("@/stores/ctx", () => ({
	__esModule: true,
	ctx: {
		get: vi.fn().mockReturnValue(true),
	},
}));
vi.mock("@/stores", () => ({
	__esModule: true,
	addMessageAction: vi.fn(),
	isLoadingAtom: vi.fn(),
	canLoadHistoryAtom: vi.fn(),
	contextChatAtom: vi.fn(),
	resetAction: vi.fn(),
	clearContextChatAction: vi.fn(),
}));

describe("Chat", () => {
	let chat: TChat;
	let mockClient: vi.Mocked<Client>;
	let mockMessage: vi.Mocked<Message>;

	const host = 'ws://example.com';
	const mockTenantId = "tenant123";
	const mockUserId = "user123";

	beforeEach(() => {
		mockClient = new Client() as vi.Mocked<Client>;
		vi.spyOn(mockClient, "connected", "get").mockReturnValue(true); // Мокируем геттер
		mockMessage = {} as vi.Mocked<Message>;
		vi.mocked(Client).mockImplementation(() => mockClient);
		vi.mocked(uuidv4).mockReturnValue("mock-uuid");

		chat = new Chat({
			brokerURL: '',
			host,
			tenantId: mockTenantId,
			userId: mockUserId,
			loadLimit: 10,
		});
	});

	afterEach(() => {
		vi.mocked(Client).mockClear();
		vi.clearAllMocks();
	});

	it("should initialize with correct parameters", () => {
		expect(Client).toHaveBeenCalledWith({
			brokerURL: host,
			connectionTimeout: 30_000,
			heartbeatIncoming: 5000,
			heartbeatOutgoing: 5000,
			onConnect: expect.any(Function),
			reconnectDelay: 1000,
		});
		expect(mockClient.activate).toHaveBeenCalled();
	});

	it("should subscribe on messages on connect", () => {
		const onConnect = vi.mocked(Client).mock.calls[1][0].onConnect;
		onConnect();
		expect(mockClient.subscribe).toHaveBeenCalledWith(
			chat["subscriptionPath"],
			expect.any(Function),
		);
	});

	it("should push message into store", () => {
		const mockMessageData: IMessage = {
			id: "mock-uuid",
			role: ERoles.user,
			text: "Hello",
			timeCreated: new Date().toISOString(),
			userId: mockUserId,
		};
		chat["pushIntoMessages"](mockMessageData);
		expect(addMessageAction).toHaveBeenCalledWith(
			chat["store"],
			mockMessageData,
			undefined,
		);
	});

	it("should unsubscribe from messages", () => {
		chat.unsubscribe();
		expect(mockClient.unsubscribe).toHaveBeenCalledWith(
			chat["subscriptionPath"],
		);
	});

	it("should return correct subscription path", () => {
		expect(chat["subscriptionPath"]).toBe(
			"/user/user123/tenant/tenant123/chat",
		);
	});

	it("should send system message", () => {
		const mockProps: ISendActionProps = {
			body: "System message",
			role: ERoles.system,
		};
		chat.send = vi.fn();
		chat.sendSystem(mockProps);
		expect(chat["send"]).toHaveBeenCalledWith({
			...mockProps,
			role: ERoles.user,
		});
	});

	it("should send message", () => {
		const mockProps: ISendActionProps = {
			body: "Hello",
			role: ERoles.user,
		};
		// @ts-ignore next-line
		chat.pushIntoMessages = vi.fn();
		chat.send(mockProps);
		expect(chat["pushIntoMessages"]).toHaveBeenCalled();
		expect(mockClient.publish).toHaveBeenCalledWith({
			body: expect.any(String),
			destination: chat["destination"],
			headers: expect.any(Object),
		});
	});

	it("should send waiting messages if connected", () => {
		chat["waitingMessages"] = [
			{
				id: "mock-uuid",
				role: ERoles.user,
				text: "Waiting message",
				timeCreated: new Date().toISOString(),
				userId: mockUserId,
			},
		];
		chat["sendWaitingMessages"]();
		expect(mockClient.publish).toHaveBeenCalledTimes(1);
		expect(chat["waitingMessages"]).toHaveLength(0);
	});

	it("should react on message", () => {
		const mockMessageData: IMessage = {
			id: "mock-uuid",
			role: ERoles.user,
			text: "Hello",
			timeCreated: new Date().toISOString(),
			userId: mockUserId,
		};
		const mockReaction: TReaction = "like";
		chat.reactOnMessage(mockMessageData, mockReaction);
		expect(addMessageAction).toHaveBeenCalledWith(
			chat["store"],
			{
				...mockMessageData,
				reaction: mockReaction,
			},
			undefined,
		);
		expect(mockClient.publish).toHaveBeenCalledWith({
			body: expect.any(String),
			destination: chat["reactionDestination"],
			headers: expect.any(Object),
		});
	});

	it("should load history", () => {
		vi.mocked(canLoadHistoryAtom).mockReturnValue(true);
		chat.loadHistory();
		expect(mockClient.publish).toHaveBeenCalledWith({
			body: expect.any(String),
			destination: chat["historyDestination"],
			headers: expect.any(Object),
		});
	});

	it("should not load history if not connected", () => {
		vi.spyOn(mockClient, "connected", "get").mockReturnValue(false); // Мокируем геттер
		chat.loadHistory();
		expect(mockClient.publish).not.toHaveBeenCalled();
	});

	it("should check if message is sending", () => {
		chat["waitingMessages"] = [
			{
				id: "mock-uuid",
				role: ERoles.user,
				text: "Waiting message",
				timeCreated: new Date().toISOString(),
				userId: mockUserId,
			},
		];
		expect(chat.isMessageSending("mock-uuid")).toBeTruthy();
		expect(chat.isMessageSending("another-uuid")).toBeFalsy();
	});

	it("should disconnect", () => {
		chat.disconnect();
		expect(mockClient.deactivate).toHaveBeenCalled();
	});

	it("should change tenantId", () => {
		const newTenantId = "newTenant123";
		chat.reconnect(newTenantId);
		expect(chat["tenantId"]).toBe(newTenantId);
		expect(resetAction).toHaveBeenCalledWith(chat["store"]);
		expect(mockClient.deactivate).toHaveBeenCalled();
		expect(mockClient.activate).toHaveBeenCalled();
	});

	it("should reinitialize", () => {
		chat.reinitialize();
		expect(mockClient.deactivate).toHaveBeenCalled();
		expect(mockClient.activate).toHaveBeenCalled();
	});

	it("should handle error while parsing server message", () => {
		// @ts-ignore next-line
		chat.subscribeOnMessages();
		const onMessage = mockClient.subscribe.mock.calls[0][1];
		// @ts-ignore next-line
		mockMessage.body = "invalid json";
		console.error = vi.fn();
		onMessage(mockMessage);
		expect(console.error).toHaveBeenCalledWith(
			"Error while parse server message:",
			"invalid json",
		);
	});

	it("should set canLoadHistoryAtom to false if lastMessage is true", () => {
		// @ts-ignore next-line
		chat.subscribeOnMessages();
		const onMessage = mockClient.subscribe.mock.calls[0][1];
		// @ts-ignore next-line
		mockMessage.body = JSON.stringify({ extras: { lastMessage: true } });
		onMessage(mockMessage);
		expect(canLoadHistoryAtom).toHaveBeenCalledWith(chat["store"], false);
	});

	it("should set isLoadingAtom to true when sending a message", () => {
		const mockProps: ISendActionProps = {
			body: "Hello",
			role: ERoles.user,
		};
		chat.send(mockProps);
		expect(isLoadingAtom).toHaveBeenCalledWith(chat["store"], true);
	});

	it("should add message to waitingMessages if not connected", () => {
		vi.spyOn(mockClient, "connected", "get").mockReturnValue(false); // Мокируем геттер
		const mockProps: ISendActionProps = {
			body: "Hello",
			role: ERoles.user,
		};
		chat.send(mockProps);
		expect(chat["waitingMessages"]).toHaveLength(1);
	});

	it("should not add message to waitingMessages if connected", () => {
		const mockProps: ISendActionProps = {
			body: "Hello",
			role: ERoles.user,
		};
		chat.send(mockProps);
		expect(chat["waitingMessages"]).toHaveLength(0);
	});

	it("should handle reaction removal", () => {
		const mockMessageData: IMessage = {
			id: "mock-uuid",
			role: ERoles.user,
			text: "Hello",
			timeCreated: new Date().toISOString(),
			userId: mockUserId,
			reaction: "like",
		};
		chat.reactOnMessage(mockMessageData, "like");
		expect(addMessageAction).toHaveBeenCalledWith(
			chat["store"],
			{
				...mockMessageData,
				reaction: undefined,
			},
			undefined,
		);
	});

	it("should not send reaction if not connected", () => {
		vi.spyOn(mockClient, "connected", "get").mockReturnValue(false); // Мокируем геттер
		const mockMessageData: IMessage = {
			id: "mock-uuid",
			role: ERoles.user,
			text: "Hello",
			timeCreated: new Date().toISOString(),
			userId: mockUserId,
		};
		chat.reactOnMessage(mockMessageData, "like");
		expect(mockClient.publish).not.toHaveBeenCalled();
	});

	it("should not load history if canLoadHistoryAtom is false", () => {
		vi.mocked(ctx.get).mockReturnValue(false);
		chat.loadHistory();
		expect(mockClient.publish).not.toHaveBeenCalled();
	});

	it("should set gettingHistory to true when loading history", () => {
		vi.mocked(ctx.get).mockReturnValue(true);
		chat.loadHistory();
		expect(chat["gettingHistory"]).toBeTruthy();
	});

	it("should set gettingHistory to false when sending a message", () => {
		const mockProps: ISendActionProps = {
			body: "Hello",
			role: ERoles.user,
		};
		chat.send(mockProps);
		expect(chat["gettingHistory"]).toBeFalsy();
	});

	it("should handle message with insertToTop option", () => {
		// @ts-ignore next-line
		chat.subscribeOnMessages();
		const onMessage = mockClient.subscribe.mock.calls[0][1];
		// @ts-ignore next-line
		mockMessage.body = JSON.stringify({ extras: { lastMessage: false } });
		chat["gettingHistory"] = true;
		onMessage(mockMessage);
		expect(addMessageAction).toHaveBeenCalledWith(
			chat["store"],
			expect.any(Object),
			{
				insertToTop: true,
				silent: true,
			},
		);
	});

	it('should send clear context message when connected', () => {
		chat.clearContext();
		expect(mockClient.publish).toHaveBeenCalledWith({
			body: JSON.stringify({ userId: mockUserId }),
			destination: chat['contextDestination'],
			headers: chat['defaultHeaders'],
		});
	});

	it('should not send clear context message when not connected', () => {
		vi.spyOn(mockClient, 'connected', 'get').mockReturnValue(false);
		chat.clearContext();
		expect(mockClient.publish).not.toHaveBeenCalled();
	});

	it('should include correct headers in clear context message', () => {
		chat.clearContext();
		const call = mockClient.publish.mock.calls[0][0];
		expect(call.headers).toEqual({
			'X-Sber-Auth-Session': 'mock-session-id',
			tenantId: mockTenantId,
		});
	});

	it('should send to correct destination', () => {
		chat.clearContext();
		const call = mockClient.publish.mock.calls[0][0];
		expect(call.destination).toBe('/app/context');
	});

	it('should include correct userId in body', () => {
		chat.clearContext();
		const call = mockClient.publish.mock.calls[0][0];
		expect(JSON.parse(call.body)).toEqual({ userId: mockUserId });
	});
});
