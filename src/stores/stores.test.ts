import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestCtx } from '@reatom/testing';
import { navigateToUrl } from 'single-spa';
import { baseUrl$, chat$ } from '@n-orm/auth-mf-app';
import {
    messagesAtom,
    isLoadingAtom,
    skillsAtom,
    contextChatAtom,
    addMessageAction,
    addSkillsAction,
    resetAction,
    clearContextChatAction,
    isCreateIncidentAvailable,
} from '@/stores';
import { ERoles } from '@/types';

// Моки для внешних зависимостей
vi.mock('single-spa', () => ({
    navigateToUrl: vi.fn(),
}));

vi.mock('@n-orm/auth-mf-app', () => ({
    baseUrl$: {
        incidents: '/incidents',
    },
    chat$: {
        closeChat: vi.fn(),
    },
}));

describe('messagesAtom', () => {
    let ctx: ReturnType<typeof createTestCtx>;

    beforeEach(() => {
        ctx = createTestCtx();
        resetAction(ctx);
        vi.clearAllMocks(); // Очищаем моки перед каждым тестом
    });

    it('should initialize with an empty array', () => {
        const messages = ctx.get(messagesAtom);
        expect(messages).toHaveLength(0);
    });

    it('should add a new message', () => {
        const message = { id: '1', text: 'Hello', role: ERoles.user };

        addMessageAction(ctx, message);

        const messages = ctx.get(messagesAtom);
        expect(messages).toHaveLength(1);
        expect(messages[0].text).toBe('Hello');
    });

    it('should not add system messages if silent is true', () => {
        const message = { id: '1', text: 'System message', role: ERoles.system };

        addMessageAction(ctx, message, { silent: false });

        const messages = ctx.get(messagesAtom);
        expect(messages).toHaveLength(0);
    });

    it('should update an existing message', () => {
        const message = { id: '1', text: 'Hello', role: ERoles.user };
        addMessageAction(ctx, message);

        const updatedMessage = { id: '1', text: 'Updated', role: ERoles.user };
        addMessageAction(ctx, updatedMessage);

        const messages = ctx.get(messagesAtom);
        expect(messages).toHaveLength(1);
        expect(messages[0].text).toBe('Updated');
    });

    it('should insert message to the top if insertToTop is true', () => {
        const message1 = { id: '1', text: 'First', role: ERoles.user };
        const message2 = { id: '2', text: 'Second', role: ERoles.user };

        addMessageAction(ctx, message1);
        addMessageAction(ctx, message2, { insertToTop: true });

        const messages = ctx.get(messagesAtom);
        expect(messages[0].text).toBe('Second');
        expect(messages[1].text).toBe('First');
    });

    it('should clear context chat and navigate on createIncident action', () => {
        const contextChat = ctx.subscribeTrack(contextChatAtom);
        const message = {
            id: '1',
            text: 'Create incident',
            extras: { action: 'createIncident' },
            requestId: '123',
        };

        addMessageAction(ctx, message);

        expect(contextChat.lastInput()).toBeNull();
        expect(chat$.closeChat).toHaveBeenCalled();
        expect(navigateToUrl).toHaveBeenCalledWith(
            `${baseUrl$.incidents}/create?requestId=123&startModalUrl=${location.pathname}`,
        );
    });
});

describe('isLoadingAtom', () => {
    let ctx: ReturnType<typeof createTestCtx>;

    beforeEach(() => {
        ctx = createTestCtx();
    });

    it('should initialize as false', () => {
        const isLoading = ctx.get(isLoadingAtom);
        expect(isLoading).toBe(false);
    });

    it('should set to false after adding a message', () => {
        const message = { id: '1', text: 'Hello', role: ERoles.user };
        addMessageAction(ctx, message);

        const isLoading = ctx.get(isLoadingAtom);
        expect(isLoading).toBe(false);
    });
});

describe('skillsAtom', () => {
    let ctx: ReturnType<typeof createTestCtx>;

    beforeEach(() => {
        ctx = createTestCtx();
    });

    it('should initialize with an empty array', () => {
        const skills = ctx.get(skillsAtom);
        expect(skills).toHaveLength(0);
    });

    it('should add skills', () => {
        const skills = [{ id: '1', title: 'Skill 1', type: 'type1', active: true }];
        addSkillsAction(ctx, skills);

        const currentSkills = ctx.get(skillsAtom);
        expect(currentSkills).toHaveLength(1);
        expect(currentSkills[0].title).toBe('Skill 1');
    });
});

describe('resetAction', () => {
    let ctx: ReturnType<typeof createTestCtx>;

    beforeEach(() => {
        ctx = createTestCtx();
    });

    it('should reset messages to an empty array', () => {
        const message = { id: '1', text: 'Hello', role: ERoles.user };
        addMessageAction(ctx, message);
        resetAction(ctx);

        const messages = ctx.get(messagesAtom);
        expect(messages).toHaveLength(0);
    });
});

describe('clearContextChatAction', () => {
    let ctx: ReturnType<typeof createTestCtx>;

    beforeEach(() => {
        ctx = createTestCtx();
    });

    it('should clear context chat', () => {
        contextChatAtom(ctx, { intent: 'createIncident' });
        clearContextChatAction(ctx);

        const contextChat = ctx.get(contextChatAtom);
        expect(contextChat).toBeNull();
    });
});

describe('isCreateIncidentAvailable', () => {
    let ctx: ReturnType<typeof createTestCtx>;

    beforeEach(() => {
        ctx = createTestCtx();
    });

    it('should return true if intent is createIncident', () => {
        contextChatAtom(ctx, { intent: 'createIncident' });
        const isAvailable = ctx.get(isCreateIncidentAvailable);
        expect(isAvailable).toBe(true);
    });

    it('should return false if intent is not createIncident', () => {
        contextChatAtom(ctx, { intent: 'other' });
        const isAvailable = ctx.get(isCreateIncidentAvailable);
        expect(isAvailable).toBe(false);
    });
});