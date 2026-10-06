import { describe, it, expect } from 'vitest';
import { TMessageStore } from './';
import { sortMessagesByTime } from './utils';

describe('sortMessagesByTime', () => {
    it('should sort messages correctly when both have valid timeCreated', () => {
        const messageA = { timeCreated: '2023-10-01T12:00:00Z' } as TMessageStore;
        const messageB = { timeCreated: '2023-10-02T12:00:00Z' } as TMessageStore;

        // messageA раньше messageB
        expect(sortMessagesByTime(messageA, messageB)).toBeLessThan(0);

        // messageB позже messageA
        expect(sortMessagesByTime(messageB, messageA)).toBeGreaterThan(0);

        // Если время одинаковое, результат должен быть 0
        expect(sortMessagesByTime(messageA, messageA)).toBe(0);
    });

    it('should handle when one message has no timeCreated', () => {
        const messageA = { timeCreated: '2023-10-01T12:00:00Z' } as TMessageStore;
        const messageB = {} as TMessageStore;

        // messageA имеет timeCreated, messageB нет
        expect(sortMessagesByTime(messageA, messageB)).toBeGreaterThan(0);

        // messageB не имеет timeCreated, messageA имеет
        expect(sortMessagesByTime(messageB, messageA)).toBeLessThan(0);
    });

    it('should handle when both messages have no timeCreated', () => {
        const messageA = {} as TMessageStore;
        const messageB = {} as TMessageStore;

        // Оба сообщения не имеют timeCreated
        expect(sortMessagesByTime(messageA, messageB)).toBe(0);
    });

    it('should handle invalid timeCreated values', () => {
        const messageA = { timeCreated: 'invalid-date' } as TMessageStore;
        const messageB = { timeCreated: '2023-10-01T12:00:00Z' } as TMessageStore;

        // messageA имеет некорректное время, messageB имеет корректное
        expect(sortMessagesByTime(messageA, messageB)).toBeLessThan(0);

        // messageB имеет корректное время, messageA имеет некорректное
        expect(sortMessagesByTime(messageB, messageA)).toBeGreaterThan(0);

        // Оба сообщения имеют некорректное время
        const messageC = { timeCreated: 'another-invalid-date' } as TMessageStore;
        expect(sortMessagesByTime(messageA, messageC)).toBe(0);
    });

    it('should handle edge cases with null or undefined timeCreated', () => {
        const messageA = { timeCreated: null } as TMessageStore;
        const messageB = { timeCreated: undefined } as TMessageStore;
        const messageC = { timeCreated: '2023-10-01T12:00:00Z' } as TMessageStore;

        // messageA имеет null, messageB имеет undefined
        expect(sortMessagesByTime(messageA, messageB)).toBe(0);

        // messageA имеет null, messageC имеет корректное время
        expect(sortMessagesByTime(messageA, messageC)).toBeLessThan(0);

        // messageB имеет undefined, messageC имеет корректное время
        expect(sortMessagesByTime(messageB, messageC)).toBeLessThan(0);
    });
});
