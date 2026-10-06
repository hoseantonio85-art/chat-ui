import React, { createContext, useContext } from 'react';

export interface AssistantSkill { id: string; title: string; }
interface AssistantSkillsValue { skills: AssistantSkill[]; selectedSkill?: AssistantSkill; onSelect: (id?: string) => void; }
const fallback: AssistantSkillsValue = { skills: [], onSelect: () => undefined };
export const AssistantSkillsContext = createContext<AssistantSkillsValue>(fallback);
export const useAssistantSkills = () => useContext(AssistantSkillsContext);

