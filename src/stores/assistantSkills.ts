import { action, atom } from '@reatom/framework';

export const selectedAssistantSkillIdAtom = atom<string | undefined>(
	undefined,
	'selectedAssistantSkillIdAtom',
);

export const selectAssistantSkillAction = action(
	(context, skillId?: string) => {
		selectedAssistantSkillIdAtom(context, skillId);
	},
	'selectAssistantSkillAction',
);
