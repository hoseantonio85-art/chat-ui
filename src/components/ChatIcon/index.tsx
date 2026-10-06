import cn from 'classnames';
import { useCallback } from 'react';

import { ChatLogoSVG } from '@/components/ChatLogoSVG';
import { EChatState, chat$ } from '@n-orm/auth-mf-app';

import classes from './styles.module.scss';

export interface IChatIconProps {
	dumb?: boolean;
	className?: string;
	onClick?: () => void;
}

export const ChatIcon = ({ className, dumb, onClick }: IChatIconProps) => {
	const handleClick = useCallback(() => {
		if (!dumb) {
			chat$.changeChatState(EChatState.small);
			chat$.openChat();
		}
		onClick?.();
	}, [dumb, onClick]);

	return (
		<div className={cn(classes.chatIcon, className)}>
			<ChatLogoSVG className={classes.logo} handleClick={handleClick} />
		</div>
	);
};
