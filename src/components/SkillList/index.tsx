import React, { useEffect, useState } from 'react';

import { useChat } from '@/helpers/useChat';
import { contextChatAtom, skillsAtom } from '@/stores';
import type { ISkillInfo } from '@/types';
import { EChatState, type IChatState, chat$ } from '@n-orm/auth-mf-app';
import { useAtom } from '@reatom/npm-react';
import { Row } from '@sber-orm/ui-kit';

import { useMobileDetect } from '@/helpers/useMobileDetect';
import cn from 'classnames';
import { Skill } from './components';
import classes from './styles.module.scss';

export interface ISkillListProps extends React.HTMLAttributes<HTMLDivElement> {
	skills?: ISkillInfo[];
	suffix?: React.ReactNode;
	large?: boolean;
	noArrow?: boolean;
	hideOnOpenChat?: boolean;
	onTrack?: (value: string) => void;
	testId?: string;
}

export const SkillList = React.memo<ISkillListProps>((props) => {
	const {
		hideOnOpenChat,
		large,
		noArrow,
		onTrack,
		skills: skillsProperty,
		suffix,
		testId,
		...rest
	} = props;

	const { isPhone } = useMobileDetect();

	const { sendSystem } = useChat();
	const [chatState, setChatState] = useState(chat$.value);

	const [, setContext] = useAtom(contextChatAtom);
	const [skills, setSkills] = useAtom(skillsAtom);

	useEffect(() => {
		setSkills(skillsProperty || []);
	}, [skillsProperty]);

	useEffect(() => {
		const observer = chat$.observer$.subscribe({
			next(data: IChatState) {
				setChatState(data);
			},
		});

		return function cleanup() {
			observer.unsubscribe();
		};
	}, []);

	const handleClick = (skill: ISkillInfo) => {
		if (skill.extras) {
			setContext(skill?.extras || {});
		}

		onTrack?.(skill?.title!);
		sendSystem({
			body: skill.title,
			extras: {
				action: 'activateSkill',
				...(skill?.extras || {}),
			},
		});
		chat$.changeChatState(EChatState.fullScreen);
		chat$.openChat();
	};

	if (
		(skills?.length === 0 && !suffix) ||
		(hideOnOpenChat && chatState.isPortalOpen)
	) {
		return null;
	}

	return (
		<Row
			gutter={16}
			align="top"
			justify="end"
			className={cn(classes.container, { [classes.containerPhone]: isPhone })}
			{...rest}
		>
			{skills.map((skill) => (
				<Skill
					key={skill.id}
					skill={skill}
					large={large}
					noArrow={noArrow}
					onClick={handleClick}
					testId={testId}
				/>
			))}
			{suffix}
		</Row>
	);
});

SkillList.displayName = 'SkillList';
