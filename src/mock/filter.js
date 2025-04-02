import { filter } from "../utils/filter";

const generateFilters = (points) => Object.entries(filter).map(([filterType, filterPoints])=> ({
    type: filterType,
    count: filterPoints(points).length
}));

export {generateFilters};
