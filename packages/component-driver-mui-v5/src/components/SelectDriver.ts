import { HTMLButtonDriver, HTMLElementDriver, HTMLTextInputDriver } from '@atomic-testing/component-driver-html';
import {
  ComponentDriver,
  defaultStep,
  IComponentDriverOption,
  IInputDriver,
  IInteractor,
  LocatorChain,
  LocatorRelativePosition,
  LocatorType,
  ScenePart,
  ScenePartDriver,
} from '@atomic-testing/core';

export const selectPart = {
  trigger: {
    locator: '[role=button]',
    driver: HTMLButtonDriver,
  },
  dropdown: {
    locator: {
      type: LocatorType.Css,
      selector: '[role=presentation].MuiPopover-root [role=listbox].MuiList-root',
      relative: LocatorRelativePosition.Root,
    },
    driver: HTMLElementDriver,
  },
  input: {
    locator: 'input.MuiSelect-nativeInput',
    driver: HTMLTextInputDriver,
  },
} satisfies ScenePart;

export type SelectScenePart = typeof selectPart;
export type SelectScenePartDriver = ScenePartDriver<SelectScenePart>;

export class SelectDriver extends ComponentDriver<SelectScenePart> implements IInputDriver<string | null> {
  constructor(locator: LocatorChain, interactor: IInteractor, option?: IComponentDriverOption) {
    super(locator, interactor, {
      perform: defaultStep,
      ...option,
      parts: selectPart,
    });
  }

  async getValue(): Promise<string | null> {
    await this.enforcePartExistence('input');
    const value = await this.parts.input.getValue();
    return value ?? null;
  }

  async setValue(value: string | null): Promise<boolean> {
    let success = false;

    await this.enforcePartExistence('trigger');
    await this.parts.trigger.click();

    await this.enforcePartExistence('dropdown');
    const optionSelector = `[data-value="${value}"]`;
    const optionLocator = this.parts.dropdown.locator.concat(optionSelector);
    const optionExists = await this.interactor.exists(optionLocator);

    if (optionExists) {
      await this.interactor.click(optionLocator);
      success = true;
    }

    return Promise.resolve(success);
  }

  get driverName(): string {
    return 'MuiV5SelectDriver';
  }
}