import React, { useState } from 'react';
import { Button, EIconName, Icon } from '@sber-orm/ui-kit';
import { useTranslation } from 'react-i18next';
import { useAssistantSkills } from './context';
import classes from './styles.module.scss';

export function AssistantSkills() {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const { skills, selectedSkill, onSelect } = useAssistantSkills();
	if (!skills.length) return null;
	return <div className={classes.root}>
		{selectedSkill ? <span className={classes.chip}><span>/</span>{selectedSkill.title}<button type="button" aria-label={t('assistantSkills.remove')} onClick={() => onSelect(undefined)}><Icon name={EIconName.cross} width={14} height={14}/></button></span> : <Button className={classes.trigger} size="S" variant="ghost" icon={EIconName.assistant} iconAfter={open ? EIconName.chevronFillUp : EIconName.chevronFillDown} onClick={() => setOpen(value => !value)}>{t('assistantSkills.trigger')}</Button>}
		{open && !selectedSkill && <div className={classes.menu}>{skills.map(skill => <button key={skill.id} type="button" onClick={() => { onSelect(skill.id); setOpen(false); }}><strong>{skill.title}</strong><span>{t('assistantSkills.addToNextRequest')}</span></button>)}</div>}
	</div>;
}

