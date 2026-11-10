import React, { useEffect, useMemo, useRef, useState } from 'react';
import { scenarioGroups, scenarios, ungroupedScenarioIds, type ScenarioId } from './scenarios';

interface ScenarioPickerProps {
  value: ScenarioId;
  onChange: (value: ScenarioId) => void;
}

const byId = new Map(scenarios.map(scenario => [scenario.id, scenario]));

function itemTitle(id: ScenarioId, groupId?: string) {
  const title = byId.get(id)?.title ?? id;
  if (groupId === 'vnd') return title.replace(/^ВНД · /, '');
  if (groupId === 'vnd-to-be') return title.replace(/^ВНД to be · /, '');
  if (groupId === 'csi') return title.replace(/^CSI · /, '');
  if (groupId === 'feedback') return title.replace(/^ОС · /, '');
  return title;
}

export function ScenarioPicker({ value, onChange }: ScenarioPickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedGroup = scenarioGroups.find(group => group.scenarioIds.some(id => id === value));
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(selectedGroup ? [selectedGroup.id] : []));
  const selectedTitle = byId.get(value)?.title ?? value;

  useEffect(() => {
    if (!selectedGroup) return;
    setExpanded(current => current.has(selectedGroup.id) ? current : new Set([...current, selectedGroup.id]));
  }, [selectedGroup?.id]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const groups = useMemo(() => scenarioGroups.map(group => ({
    ...group,
    scenarios: group.scenarioIds.map(id => byId.get(id)!).filter(Boolean),
  })), []);

  const select = (id: ScenarioId) => {
    onChange(id);
    setOpen(false);
  };

  const toggleGroup = (id: string) => setExpanded(current => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return <div className="scenario-tree" ref={rootRef}>
    <button
      type="button"
      className="scenario-tree-trigger"
      aria-label="Сценарий"
      aria-haspopup="tree"
      aria-expanded={open}
      onClick={() => setOpen(value => !value)}
    >
      <span>{selectedTitle}</span><span className="scenario-tree-chevron" aria-hidden="true" />
    </button>
    {open && <div className="scenario-tree-menu" role="tree" aria-label="Сценарии">
      {groups.map(group => {
        const isExpanded = expanded.has(group.id);
        return <div className="scenario-tree-group" key={group.id}>
          <button
            type="button"
            className="scenario-tree-group-trigger"
            role="treeitem"
            aria-expanded={isExpanded}
            onClick={() => toggleGroup(group.id)}
          >
            <span className="scenario-tree-chevron" aria-hidden="true" />
            <span>{group.title}</span>
          </button>
          {isExpanded && <div className="scenario-tree-children" role="group">
            {group.scenarios.map(scenario => <button
              type="button"
              role="treeitem"
              aria-selected={scenario.id === value}
              className="scenario-tree-item"
              key={scenario.id}
              onClick={() => select(scenario.id)}
            >{itemTitle(scenario.id, group.id)}</button>)}
          </div>}
        </div>;
      })}
      {ungroupedScenarioIds.map(id => <button
        type="button"
        role="treeitem"
        aria-selected={id === value}
        className="scenario-tree-item scenario-tree-item-root"
        key={id}
        onClick={() => select(id)}
      >{itemTitle(id)}</button>)}
    </div>}
  </div>;
}
