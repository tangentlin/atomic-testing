import {
  ComponentDriver,
  defaultStep,
  IComponentDriverOption,
  IInputDriver,
  IInteractor,
  LocatorChain,
} from '@atomic-testing/core';

export class HTMLTextInputDriver extends ComponentDriver<{}> implements IInputDriver<string | null> {
  constructor(locator: LocatorChain, interactor: IInteractor, option?: IComponentDriverOption) {
    super(locator, interactor, {
      perform: defaultStep,
      ...option,
      parts: {},
    });
  }

  async getValue(): Promise<string | null> {
    const value = await this.interactor.getInputValue(this.locator);
    return value ?? null;
  }

  async setValue(value: string | null): Promise<boolean> {
    await this.interactor.enterText(this.locator, value ?? '');
    return true;
  }

  isDisabled(): Promise<boolean> {
    return this.interactor.isDisabled(this.locator);
  }

  isReadonly(): Promise<boolean> {
    return this.interactor.isReadonly(this.locator);
  }

  get driverName(): string {
    return 'HTMLTextInput';
  }
}
