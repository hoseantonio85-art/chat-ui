import { Button, EIconName, Icon, Row, Text } from '@sber-orm/ui-kit';
import cn from 'classnames';
import React from 'react';
import classes from '../../styles.module.scss';
import { ISkillProps } from './types';

export const Skill = ({
	large,
	noArrow,
	onClick,
	skill,
	testId,
}: ISkillProps) => {
	if (large && noArrow) {
		return (
			<Button
				size="S"
				fullWidth
				onClick={() => onClick(skill)}
				data-testid={testId && `${testId}-btn-${skill.id}`}
			>
				<span className={classes.title}>{skill.title}</span>
			</Button>
		);
	}

	return (
		<button
			className={cn(classes.skill, classes[skill?.type || ''], {
				[classes.skillLarge]: large,
			})}
			onClick={() => onClick(skill)}
			data-testid={testId && `${testId}-btn-${skill.id}`}
		>
			<Row justify={noArrow ? 'center' : 'between'} align="middle" gutter={16}>
				<Text size="lg" className={classes.text} medium>
					{skill.title}
				</Text>
				{!noArrow && <Icon name={EIconName.arrowUp} />}
			</Row>
		</button>
	);
};
