function adaptToServer(point) {
  const dateFrom = point.dateFrom instanceof Date ? point.dateFrom.toISOString() : point.dateFrom;
  const dateTo = point.dateTo instanceof Date ? point.dateTo.toISOString() : point.dateTo;

  const adaptedPoint = {
    'base_price': Number(point.basePrice),
    'date_from': dateFrom,
    'date_to': dateTo,
    'destination': point.destination,
    'is_favorite': Boolean(point.isFavorite),
    'offers': Array.isArray(point.offers) ? point.offers : [],
    'type': point.type
  };

  return adaptedPoint;
}


function adaptToClient(point) {
  const adaptedPoint = {
    ...point,
    dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : new Date(point['date_from']),
    dateTo: point['date_to'] !== null ? new Date(point['date_to']) : new Date(point['date_to']),
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
}

export {adaptToClient, adaptToServer};
