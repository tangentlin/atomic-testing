import 'css.escape';

import { LocatorRelativePosition, LocatorType, PartLocatorType } from './PartLocatorType';

export function byValue(
  value: string,
  relative: LocatorRelativePosition = LocatorRelativePosition.Descendent,
): PartLocatorType {
  const sanitized = value;
  return {
    type: LocatorType.Css,
    selector: `[value="${sanitized}"]`,
    relative,
  };
}
