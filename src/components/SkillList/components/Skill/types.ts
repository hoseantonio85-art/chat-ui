import { ISkillInfo } from '@/types';

export interface ISkillProps {
	skill: ISkillInfo;
	onClick: (skill: ISkillInfo) => void;
	testId?: string;
	noArrow?: boolean;
	large?: boolean;
}
