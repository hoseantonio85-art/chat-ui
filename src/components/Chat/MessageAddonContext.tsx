import React, { createContext, useContext } from 'react';
import type { IMessage } from '@/types';

export interface MessageAddonSlots {
  inMessage?: React.ReactNode;
  afterMessage?: React.ReactNode;
}

export type MessageAddonRenderer = (message: IMessage) => React.ReactNode | MessageAddonSlots;

export const isMessageAddonSlots = (value: React.ReactNode | MessageAddonSlots): value is MessageAddonSlots =>
  value !== null && typeof value === 'object' && !React.isValidElement(value) && ('inMessage' in value || 'afterMessage' in value);

export const MessageAddonContext = createContext<MessageAddonRenderer | undefined>(undefined);

export const useMessageAddon = (): MessageAddonRenderer | undefined => useContext(MessageAddonContext);
