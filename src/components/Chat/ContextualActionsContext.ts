import { createContext, type ReactNode } from 'react';
import type { IMessage } from '@/types';

export const ContextualActionsContext = createContext<{
  matches: (message: IMessage) => boolean;
  render: (placement: 'inline' | 'sticky') => ReactNode;
} | undefined>(undefined);
