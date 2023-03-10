import { ScenePart, StepFunction, TestEngine } from '@atomic-testing/core';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { ReactInteractor } from './ReactInteractor';
import { IReactTestEngineOption } from './types';

const wrapAct: StepFunction = async (fn) => {
  await act(fn);
};

export function createTestEngine<T extends ScenePart>(
  node: JSX.Element,
  partDefinitions: T,
  option?: Readonly<Partial<IReactTestEngineOption>>,
): TestEngine<T> {
  const rootEl = option?.rootElement ?? document.body;
  const step = option?.perform ?? wrapAct;
  const container = rootEl.appendChild(document.createElement('div'));

  const root = createRoot(container);
  act(() => root.render(node));

  const cleanup = () => {
    act(() => root.unmount());
    rootEl.removeChild(container);
    return Promise.resolve();
  };

  const engine = new TestEngine(
    [],
    new ReactInteractor(),
    {
      perform: step,
      parts: partDefinitions,
    },
    cleanup,
  );

  return engine;
}
