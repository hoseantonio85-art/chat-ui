import React, { createContext, useContext } from 'react';
import type { IMessage } from '@/types';

export type MessageAddonRenderer = (message: IMessage) => React.ReactNode;

export const MessageAddonContext = createContext<MessageAddonRenderer | undefined>(undefined);

export const useMessageAddon = (): MessageAddonRenderer | undefined => useContext(MessageAddonContext);
