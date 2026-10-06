import { useEffect } from 'react';

import { Chat } from '@/services/chat';
import { type ITenant, tenant$, user$ } from '@n-orm/auth-mf-app';

let chatInstance: Chat;

export const useChat = () => {
	if (!chatInstance) {
		chatInstance = new Chat({
			host: `${window.location.protocol.startsWith('https') ? 'wss' : 'ws'}://${window.location.host}`,
			brokerURL: window.SBERORM_CHAT_WEBSOCKET_URL,
			loadLimit: window.SBERORM_CHAT_LOAD_LIMIT,
			tenantId: tenant$.value.tenantId as string,
			userId: user$.value.userId!,
		});
	}

	useEffect(() => {
		const observer = tenant$.observer$.subscribe({
			next(data: ITenant) {
				chatInstance.reconnect(data.tenantId as string);
			},
		});

		return function cleanup() {
			observer.unsubscribe();
		};
	}, []);

	return {
		clearContext: chatInstance.clearContext,
		connected: chatInstance.isConnected(),
		disconnect: chatInstance.disconnect,
		isMessageSending: chatInstance.isMessageSending,
		loadHistory: chatInstance.loadHistory,
		reactOnMessage: chatInstance.reactOnMessage,
		reinitialize: chatInstance.reinitialize,
		send: chatInstance.send,
		sendSystem: chatInstance.sendSystem,
	};
};
