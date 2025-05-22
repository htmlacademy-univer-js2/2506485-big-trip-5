import { isFuturePoint, isPastPoint, isPresentPoint } from './points';
import { FilterType } from './const';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point))
};

const generateFilters = (points) => Object.entries(filter).map(([filterType, filterPoints])=> ({
  type: filterType,
  count: filterPoints(points).length
}));

export{filter, generateFilters};
