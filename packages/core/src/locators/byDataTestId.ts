import { LocatorRelativePosition, LocatorType, PartLocatorType } from './PartLocatorType';

export function byDataTestId(
  id: string | string[],
  relativeTo: LocatorRelativePosition = LocatorRelativePosition.Descendent,
): PartLocatorType {
  const ids = Array.isArray(id) ? id : [id];
  const selector = ids.map((idVal) => `[data-testid="${idVal}"]`).join(' ');

  return {
    type: LocatorType.Css,
    selector,
    relative: relativeTo,
  };
}
