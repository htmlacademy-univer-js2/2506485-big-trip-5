import { isFuterePoint, isPastPoint, isPresentPoint } from './points';
const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFuterePoint(point)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPastPoint(point))
};

export{filter};
