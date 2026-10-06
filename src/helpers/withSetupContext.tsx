import type React from 'react';

import type { IChatProps } from '@/components/Chat';
import type { IChatIconProps } from '@/components/ChatIcon';
import type { IChatInputProps } from '@/components/ChatInput';
import { ModalContainer } from '@/components/ModalContainer';
import { ChatFeaturesProvider } from '@/providers/ChatFeaturesProvider';
import type { ISkillListProps } from '@/components/SkillList';
import '@/i18n';
import { ctx } from '@/stores/ctx';
import { reatomContext } from '@reatom/npm-react';

type TWithSetupContext =
	| IChatInputProps
	| ISkillListProps
	| IChatIconProps
	| IChatProps;

export function withSetupContext<
	T extends TWithSetupContext = TWithSetupContext,
>(WrappedComponent: React.ComponentType<T>, withModalContainer = true) {
	// Try to create a nice displayName for React Dev Tools.
	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';

	const ComponentWithControlled = (props: T) => (
		<reatomContext.Provider value={ctx}>
			<ChatFeaturesProvider>
				{withModalContainer && <ModalContainer />}
				<WrappedComponent {...(props as T)} />
			</ChatFeaturesProvider>
		</reatomContext.Provider>
	);

	ComponentWithControlled.displayName = `withSetupContext(${displayName})`;

	return ComponentWithControlled;
}
