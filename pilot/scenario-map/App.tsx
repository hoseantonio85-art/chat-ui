/// <reference types="vite/client" />
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getAdjacentStep,
  getInitialLocation,
  getScenario,
  getScenarioStep,
  getSettingsNextSteps,
  scenarios,
  settingsTransitions,
  toLivePreviewUrl,
  toSearch,
  type MapLocation,
  type MapView,
  type ScenarioId,
  type ScenarioStep,
} from './model';

const STORY_POSITIONS = [
  { x: 470, y: 70 }, { x: 840, y: 70 }, { x: 1210, y: 70 }, { x: 1580, y: 70 },
  { x: 1580, y: 470 }, { x: 1210, y: 470 }, { x: 840, y: 470 }, { x: 470, y: 470 },
];
const SCREEN_POSITIONS = [
  { x: 420, y: 60 }, { x: 1000, y: 60 }, { x: 1580, y: 60 }, { x: 2160, y: 60 },
  { x: 2160, y: 600 }, { x: 1580, y: 600 }, { x: 1000, y: 600 }, { x: 420, y: 600 },
];
const SCREEN_BASE = `${import.meta.env.BASE_URL}scenario-map/`;
const SCENARIO_LABELS: Record<ScenarioId, string> = {
  vnd:'Проверка ВНД', 'reply-ready':'Ответ готов в другом чате', settings:'Настройки', csi:'CSI после ВНД', 'csi-direct':'CSI по запросу',
  'feedback-complaint':'Жалоба / помощь', 'feedback-positive':'Идея / похвала',
};

interface Transform {
  x: number;
  y: number;
  zoom: number;
}

const Icon = ({ name }: { name: 'story' | 'screens' | 'minus' | 'plus' | 'fit' | 'external' | 'close' | 'arrow' }) => {
  const paths = {
    story: <><path d="M5 6h5M5 12h9M5 18h12"/><circle cx="18" cy="6" r="2"/></>,
    screens: <><rect x="3" y="4" width="8" height="7" rx="1.5"/><rect x="13" y="4" width="8" height="7" rx="1.5"/><rect x="3" y="13" width="8" height="7" rx="1.5"/><rect x="13" y="13" width="8" height="7" rx="1.5"/></>,
    minus: <path d="M5 12h14"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    fit: <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>,
    external: <path d="M14 4h6v6M20 4l-9 9M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    arrow: <path d="m9 5 7 7-7 7"/>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>;
};

function StoryCard({ step, selected, onSelect, onOpenScreen }: {
  step: ScenarioStep;
  selected: boolean;
  onSelect: () => void;
  onOpenScreen: () => void;
}) {
  return (
    <article className="story-card" data-selected={selected} data-kind={step.kind}>
      <button className="card-hit" onClick={onSelect} aria-pressed={selected} aria-label={`Шаг ${step.number}: ${step.title}`} />
      <div className="card-kicker"><span>{step.number}</span><span>{step.actor}</span></div>
      <h3>{step.title}</h3>
      <p>{step.summary}</p>
      <div className="tag-row">{step.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <button className="card-link" onClick={event => { event.stopPropagation(); onOpenScreen(); }}>
        Экран <Icon name="arrow" />
      </button>
    </article>
  );
}

function ScreenCard({ step, selected, onSelect, onOpen }: {
  step: ScenarioStep;
  selected: boolean;
  onSelect: () => void;
  onOpen: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <article className="screen-card" data-selected={selected}>
      <button className="screen-preview" onClick={onSelect} aria-pressed={selected} aria-label={`Выбрать экран ${step.number}: ${step.title}`}>
        <img src={`${SCREEN_BASE}${step.screen}`} alt={step.screenAlt} />
      </button>
      <footer>
        <div><span>{step.number}</span><strong>{step.title}</strong></div>
        <button className="round-action" onClick={event => onOpen(event.currentTarget)} aria-label={`Открыть ${step.title} в масштабе 100%`} title="Открыть в масштабе 100%">
          <Icon name="external" />
        </button>
      </footer>
    </article>
  );
}

export function App() {
  const [location, setLocation] = useState<MapLocation>(() => getInitialLocation(window.location.search));
  const [transform, setTransform] = useState<Transform>({ x: 32, y: 32, zoom: .72 });
  const [fullScreenStep, setFullScreenStep] = useState<ScenarioStep>();
  const [liveReadyStepId, setLiveReadyStepId] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const appShellRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const liveFrameRef = useRef<HTMLIFrameElement>(null);
  const dragRef = useRef<{ x: number; y: number; originX: number; originY: number }>();
  const modalPreviousRef = useRef<HTMLButtonElement>(null);
  const modalNextRef = useRef<HTMLButtonElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const screenTriggerRef = useRef<HTMLElement>();
  const restoreScreenFocusRef = useRef(false);

  const focusFirstModalControl = () => {
    const control = [modalPreviousRef.current, modalNextRef.current, modalCloseRef.current]
      .find(item => item && !item.disabled);
    control?.focus();
  };

  const scenario = getScenario(location.scenarioId) ?? scenarios[0];
  const selectedStep = getScenarioStep(scenario.id, location.stepId) ?? scenario.steps[0];
  const isStory = location.view === 'story';
  const isSettings = scenario.id === 'settings';
  const isReplyReady = scenario.id === 'reply-ready';
  const fitWholeFlow = isSettings || isReplyReady;
  const cardSize = isStory ? { width: 330, height: 250 } : { width: 510, height: 405 };
  const column = cardSize.width + 64;
  const row = cardSize.height + 56;
  const positions = isSettings ? [
    { x: 0, y: row / 2 }, { x: column, y: row / 2 },
    { x: column * 2, y: 0 }, { x: column * 3, y: 0 },
    { x: column * 2, y: row }, { x: column * 3, y: row },
  ] : isReplyReady
    ? scenario.steps.map((_, index) => ({ x: column * index, y: 0 }))
    : isStory ? STORY_POSITIONS : SCREEN_POSITIONS;
  const boardSize = isSettings
    ? { width: column * 3 + cardSize.width, height: row + cardSize.height }
    : isReplyReady
      ? { width: column * (scenario.steps.length - 1) + cardSize.width, height: cardSize.height }
      : isStory ? { width: 1640, height: 790 } : { width: 2160, height: 1090 };
  const selectedBranches = isSettings ? getSettingsNextSteps(selectedStep.id) : [];
  const liveBranches = isSettings && fullScreenStep ? getSettingsNextSteps(fullScreenStep.id) : [];

  const updateLocation = useCallback((change: Partial<MapLocation>) => {
    setLocation(current => {
      const next = { ...current, ...change };
      const nextScenario = getScenario(next.scenarioId) ?? scenarios[0];
      if (!getScenarioStep(nextScenario.id, next.stepId)) next.stepId = nextScenario.steps[0].id;
      window.history.replaceState(null, '', `${window.location.pathname}${toSearch(next)}`);
      return next;
    });
  }, []);

  const fitBoard = useCallback(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const padding = fitWholeFlow ? 24 : 56;
    const fitZoom = Math.min(
      1,
      Math.min((workspace.clientWidth - padding * 2) / boardSize.width, (workspace.clientHeight - padding * 2) / boardSize.height),
    );
    const zoom = Math.max(fitWholeFlow ? .14 : isStory ? .86 : .22, fitZoom);
    setTransform({
      zoom,
      x: isStory && !fitWholeFlow ? 24 : Math.max(12, (workspace.clientWidth - boardSize.width * zoom) / 2),
      y: Math.max(24, (workspace.clientHeight - boardSize.height * zoom) / 2),
    });
  }, [boardSize.height, boardSize.width, fitWholeFlow, isStory]);

  useEffect(() => {
    fitBoard();
    const onResize = () => fitBoard();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [fitBoard, location.scenarioId, location.view]);

  useEffect(() => {
    const shell = appShellRef.current;
    if (!shell) return;
    if (fullScreenStep) shell.setAttribute('inert', '');
    else shell.removeAttribute('inert');
  }, [fullScreenStep]);

  useEffect(() => {
    if (fullScreenStep) {
      focusFirstModalControl();
    } else if (restoreScreenFocusRef.current) {
      restoreScreenFocusRef.current = false;
      window.setTimeout(() => screenTriggerRef.current?.focus(), 0);
    }
  }, [fullScreenStep]);

  const openFullScreen = (step: ScenarioStep, trigger?: HTMLElement) => {
    screenTriggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : undefined);
    updateLocation({ stepId: step.id });
    setLiveReadyStepId(undefined);
    setFullScreenStep(step);
  };

  const closeFullScreen = () => {
    restoreScreenFocusRef.current = true;
    setLiveReadyStepId(undefined);
    setFullScreenStep(undefined);
  };

  const showFullScreenStep = (step: ScenarioStep) => {
    updateLocation({ stepId: step.id });
    setLiveReadyStepId(undefined);
    setFullScreenStep(step);
  };
  const moveFullScreen = (direction: -1 | 1) => {
    if (!fullScreenStep) return;
    const step = getAdjacentStep(scenario.id, fullScreenStep.id, direction);
    if (step && step.id !== fullScreenStep.id) showFullScreenStep(step);
  };

  useEffect(() => {
    const onPopState = () => setLocation(getInitialLocation(window.location.search));
    const onKeyDown = (event: KeyboardEvent) => {
      if (fullScreenStep) {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeFullScreen();
          return;
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          moveFullScreen(event.key === 'ArrowLeft' ? -1 : 1);
          return;
        }
        if (event.key === 'Tab') {
          const controls = Array.from(modalRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), iframe') ?? []);
          if (!controls.length) return;
          const current = controls.indexOf(document.activeElement as HTMLElement);
          const next = event.shiftKey
            ? controls[(current <= 0 ? controls.length : current) - 1]
            : controls[(current + 1) % controls.length];
          event.preventDefault();
          if (next.tagName === 'IFRAME') {
            const frame = next as HTMLIFrameElement;
            const frameControls = Array.from(frame.contentDocument?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])') ?? [])
              .filter(item => item.tabIndex >= 0 && item.getClientRects().length > 0);
            const frameTarget = event.shiftKey ? frameControls.at(-1) : frameControls[0];
            if (frameTarget) {
              frame.focus();
              frameTarget.focus();
              return;
            }
          }
          next.focus();
        }
        return;
      }
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if ((event.target as HTMLElement)?.matches('input, textarea, select, button')) return;
      const step = getAdjacentStep(scenario.id, selectedStep.id, event.key === 'ArrowLeft' ? -1 : 1);
      if (step) updateLocation({ stepId: step.id });
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [fullScreenStep, scenario.id, selectedStep.id, updateLocation]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== liveFrameRef.current?.contentWindow) return;
      if (event.data?.type === 'atlas:close-live-preview') closeFullScreen();
      if (event.data?.type === 'atlas:live-preview-ready' && fullScreenStep) {
        setLiveReadyStepId(fullScreenStep.id);
        focusFirstModalControl();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [fullScreenStep]);

  const progress = useMemo(() => scenario.steps.findIndex(step => step.id === selectedStep.id) + 1, [scenario, selectedStep]);

  const moveStep = (direction: -1 | 1) => {
    const step = getAdjacentStep(scenario.id, selectedStep.id, direction);
    if (step) updateLocation({ stepId: step.id });
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const rect = workspace.getBoundingClientRect();
    const pointX = event.clientX - rect.left;
    const pointY = event.clientY - rect.top;
    const nextZoom = Math.min(1.25, Math.max(fitWholeFlow ? .14 : .2, transform.zoom * (event.deltaY > 0 ? .9 : 1.1)));
    const ratio = nextZoom / transform.zoom;
    setTransform({
      zoom: nextZoom,
      x: pointX - (pointX - transform.x) * ratio,
      y: pointY - (pointY - transform.y) * ratio,
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button, article')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, originX: transform.x, originY: transform.y };
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    setTransform(current => ({ ...current, x: drag.originX + event.clientX - drag.x, y: drag.originY + event.clientY - drag.y }));
  };

  const stopDragging = () => {
    dragRef.current = undefined;
    setDragging(false);
  };

  const rootPosition = { x: 70, y: isStory ? 275 : 425, width: isStory ? 300 : 285, height: isStory ? 180 : 200 };
  const stepPoints = scenario.steps.map((_, index) => ({ ...positions[index], ...cardSize }));
  const connectorPoints = isReplyReady ? stepPoints : [rootPosition, ...stepPoints];
  const settingsPoints = new Map(scenario.steps.map((step, index) => [step.id, stepPoints[index]]));
  const connections = isSettings
    ? settingsTransitions.map(([from, to]) => [settingsPoints.get(from)!, settingsPoints.get(to)!])
    : connectorPoints.slice(0, -1).map((from, index) => [from, connectorPoints[index + 1]]);
  const isAtBoundary = (step: ScenarioStep, direction: -1 | 1) =>
    getAdjacentStep(scenario.id, step.id, direction)?.id === step.id;

  return (
    <>
    <div ref={appShellRef} className="app-shell" aria-hidden={fullScreenStep ? true : undefined}>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark"><i /><i /><i /></span>
          <div><strong>Карта продукта</strong><span>Универсальный агент НОРМ</span></div>
        </div>
        <div className="view-switch" role="group" aria-label="Представление карты">
          <button data-active={isStory} aria-pressed={isStory} onClick={() => updateLocation({ view: 'story' })}><Icon name="story" />Сценарий</button>
          <button data-active={!isStory} aria-pressed={!isStory} onClick={() => updateLocation({ view: 'screens' })}><Icon name="screens" />Экраны</button>
        </div>
        <div className="top-meta"><span>MVP</span><strong>{scenario.steps.length}</strong> состояний</div>
      </header>

      <nav className="scenario-rail" aria-label="Сценарии MVP">
        <div className="rail-title"><span>Сценарии</span><small>{scenarios.length} из {scenarios.length}</small></div>
        {scenarios.map((item, index) => (
          <button
            key={item.id}
            className="scenario-button"
            data-active={item.id === scenario.id}
            aria-current={item.id === scenario.id ? 'true' : undefined}
            onClick={() => updateLocation({ scenarioId: item.id, stepId: item.steps[0].id })}
          >
            <span className={`scenario-index ${item.accent}`}>0{index + 1}</span>
            <span><strong>{SCENARIO_LABELS[item.id]}</strong><small>{item.steps.length} состояний</small></span>
          </button>
        ))}
        <div className="rail-note">
          <span>Как читать карту</span>
          <p>Выберите шаг. Справа появится контекст, а представление можно менять без потери позиции.</p>
        </div>
      </nav>

      <main className="workspace-shell">
        <div className="workspace-title">
          <div><span>{scenario.eyebrow}</span><h1>{scenario.title}</h1></div>
          <div className="zoom-controls" aria-label="Масштаб карты">
            <button onClick={() => setTransform(current => ({ ...current, zoom: Math.max(fitWholeFlow ? .14 : .2, current.zoom - .1) }))} aria-label="Уменьшить масштаб"><Icon name="minus" /></button>
            <span>{Math.round(transform.zoom * 100)}%</span>
            <button onClick={() => setTransform(current => ({ ...current, zoom: Math.min(1.25, current.zoom + .1) }))} aria-label="Увеличить масштаб"><Icon name="plus" /></button>
            <button onClick={fitBoard} aria-label={isStory && !fitWholeFlow ? 'Установить читаемый масштаб' : 'Вписать карту'}><Icon name="fit" /></button>
          </div>
        </div>

        <div
          className="workspace"
          data-dragging={dragging}
          ref={workspaceRef}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
        >
          <div
            className="board"
            style={{ width: boardSize.width, height: boardSize.height, transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})` }}
          >
            <svg className="connectors" width={boardSize.width} height={boardSize.height} aria-hidden="true">
              <defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" /></marker></defs>
              {connections.map(([from, to]) => {
                const sameRow = Math.abs(from.y - to.y) < 20;
                const sameColumn = Math.abs(from.x - to.x) < 20;
                let x1 = from.x + from.width; let y1 = from.y + from.height / 2;
                let x2 = to.x; let y2 = to.y + to.height / 2;
                if (sameRow && to.x < from.x) { x1 = from.x; x2 = to.x + to.width; }
                if (sameColumn) { x1 = from.x + from.width / 2; x2 = to.x + to.width / 2; y1 = from.y + from.height; y2 = to.y; }
                const bend = sameRow || sameColumn ? `${x1},${y1} ${x2},${y2}` : `${x1},${y1} ${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;
                return <polyline key={`${from.x}-${from.y}-${to.x}-${to.y}`} points={bend} markerEnd="url(#arrowhead)" />;
              })}
            </svg>

            {!fitWholeFlow && <section className="scenario-root" data-accent={scenario.accent} style={{ left: rootPosition.x, top: rootPosition.y, width: rootPosition.width, height: rootPosition.height }}>
              <span>{scenario.eyebrow}</span><h2>{scenario.title}</h2><p>{scenario.description}</p>
            </section>}

            {scenario.steps.map((step, index) => (
              <div className="positioned-card" key={step.id} style={{ left: positions[index].x, top: positions[index].y }}>
                {isStory ? (
                  <StoryCard
                    step={step}
                    selected={step.id === selectedStep.id}
                    onSelect={() => updateLocation({ stepId: step.id })}
                    onOpenScreen={() => updateLocation({ stepId: step.id, view: 'screens' })}
                  />
                ) : (
                  <ScreenCard
                    step={step}
                    selected={step.id === selectedStep.id}
                    onSelect={() => updateLocation({ stepId: step.id })}
                    onOpen={trigger => openFullScreen(step, trigger)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="workspace-hint"><span className="desktop-hint">Колесо — масштаб · потяните фон — перемещение</span><span className="touch-hint">Потяните карту, чтобы увидеть следующие шаги</span></div>
        </div>
      </main>

      <aside className="inspector" aria-label="Выбранный шаг">
        <div className="inspector-count"><span>{selectedStep.number}</span><small>{progress} / {scenario.steps.length}</small></div>
        <div className="inspector-copy">
          <span>{selectedStep.actor} · {selectedStep.kind}</span>
          <h2>{selectedStep.title}</h2>
          <p>{selectedStep.detail}</p>
        </div>
        <div className="inspector-screen">
          <img src={`${SCREEN_BASE}${selectedStep.screen}`} alt="" />
          <button onClick={event => openFullScreen(selectedStep, event.currentTarget)}>Открыть 100%</button>
        </div>
        <button className="cross-view" onClick={() => updateLocation({ view: isStory ? 'screens' : 'story' })}>
          <Icon name={isStory ? 'screens' : 'story'} />
          {isStory ? 'Показать на карте экранов' : 'Показать в сценарии'}
        </button>
        {selectedBranches.length > 1 && <div className="branch-choices" role="group" aria-label="Действия с памятью">
          {selectedBranches.map(step => <button key={step.id} onClick={() => updateLocation({ stepId: step.id })}>{step.title}</button>)}
        </div>}
        <div className="step-navigation">
          <button onClick={() => moveStep(-1)} disabled={isAtBoundary(selectedStep, -1)} aria-label="Предыдущий шаг"><Icon name="arrow" /></button>
          <div>{selectedStep.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <button onClick={() => moveStep(1)} disabled={isAtBoundary(selectedStep, 1)} aria-label="Следующий шаг"><Icon name="arrow" /></button>
        </div>
      </aside>
    </div>

      {fullScreenStep && (
        <div ref={modalRef} className="screen-modal" data-branching={liveBranches.length > 1} role="dialog" aria-modal="true" aria-label={`${fullScreenStep.title}, живой HTML в масштабе 100%`}>
          <header>
            <div><span>{fullScreenStep.number} · LIVE · 100%</span><strong>{fullScreenStep.title}</strong></div>
            <div className="modal-actions">
              <button ref={modalPreviousRef} onClick={() => moveFullScreen(-1)} disabled={isAtBoundary(fullScreenStep, -1)} aria-label="Предыдущий экран"><Icon name="arrow" /></button>
              <span>{scenario.steps.findIndex(step => step.id === fullScreenStep.id) + 1} / {scenario.steps.length}</span>
              <button ref={modalNextRef} onClick={() => moveFullScreen(1)} disabled={isAtBoundary(fullScreenStep, 1)} aria-label="Следующий экран"><Icon name="arrow" /></button>
              <button ref={modalCloseRef} onClick={closeFullScreen} aria-label="Закрыть просмотр"><Icon name="close" /></button>
            </div>
          </header>
          {liveBranches.length > 1 && <div className="branch-choices modal-branches" role="group" aria-label="Действия с памятью">
            {liveBranches.map(step => <button key={step.id} onClick={() => showFullScreenStep(step)}>{step.title}</button>)}
          </div>}
          <div className="full-screen-stage">
            {liveReadyStepId !== fullScreenStep.id && <div className="live-loading" role="status">Загружаем живой экран…</div>}
            <iframe ref={liveFrameRef} key={fullScreenStep.id} src={toLivePreviewUrl(import.meta.env.BASE_URL, fullScreenStep.id)} title={`Живой экран: ${fullScreenStep.title}`} width="1416" height="812" sandbox="allow-scripts allow-same-origin allow-forms" />
            <span className="frame-focus-return" tabIndex={0} onFocus={focusFirstModalControl} />
          </div>
        </div>
      )}
    </>
  );
}
