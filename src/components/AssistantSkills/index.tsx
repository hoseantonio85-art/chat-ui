import React, { useState } from 'react';
import { Button, EIconName, Icon } from '@sber-orm/ui-kit';
import { useAssistantSkills } from './context';
import classes from './styles.module.scss';

export function AssistantSkills() {
	const [open, setOpen] = useState(false);
	const { skills, selectedSkill, onSelect } = useAssistantSkills();
	if (!skills.length) return null;
	return <div className={classes.root}>
		{selectedSkill ? <span className={classes.chip}><span>/</span>{selectedSkill.title}<button type="button" aria-label="Убрать навык" onClick={() => onSelect(undefined)}><Icon name={EIconName.cross} width={14} height={14}/></button></span> : <Button className={classes.trigger} size="S" variant="ghost" icon={EIconName.ai} iconAfter={open ? EIconName.chevronFillUp : EIconName.chevronFillDown} onClick={() => setOpen(value => !value)}>Навыки ассистента</Button>}
		{open && !selectedSkill && <div className={classes.menu}>{skills.map(skill => <button key={skill.id} type="button" onClick={() => { onSelect(skill.id); setOpen(false); }}><strong>{skill.title}</strong><span>Добавить к следующему запросу</span></button>)}</div>}
	</div>;
}

