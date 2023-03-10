export interface IFormFieldDriver<T> {
  getValue(): Promise<T>;
}

export interface IInputDriver<T> extends IFormFieldDriver<T> {
  setValue(value: T): Promise<boolean>;
}

export interface IToggleDriver {
  isSelected(): Promise<boolean>;
  setSelected(selected: boolean): Promise<void>;
}

export interface IClickOption {}
export interface IClickableDriver {
  click(option?: IClickOption): Promise<void>;
}
