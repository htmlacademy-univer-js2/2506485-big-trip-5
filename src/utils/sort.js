import dayjs from 'dayjs';

const SortTypes = {
  DAY: 'DAY',
  EVENT: 'EVENT',
  TIME: 'TIME',
  PRICE: 'PRICE',
  OFFERS: 'OFFERS'
};

function sortByDay(pointA, pointB){
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function sortByPrice(pointA, pointB){
  return pointB.basePrice - pointA.basePrice;
}

function sortByTime(pointA, pointB){
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

export{SortTypes, sortByTime, sortByDay, sortByPrice};
