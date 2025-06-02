import dayjs from 'dayjs';
import { SortTypes, sortByDay } from './sort.js';

const DATE_FORMAT = 'MMM DD'; // Формат для отображения дат в информации о поездке

/**
 * Получает маршрут поездки в виде массива названий городов
 * @param {Array<Point>} points - Массив точек маршрута
 * @param {Array<Destination>} destinations - Массив возможных направлений
 * @return {Array<string>} - Массив названий городов в порядке посещения
 */
const getTripCities = (points, destinations) => {
  if (!points.length || !destinations.length) return [];
  
  const sortedPoints = [...points].sort(sortByDay);
  
  return sortedPoints.map(point => {
    const destination = destinations.find(dest => dest.id === point.destination);
    return destination?.name || '';
  }).filter(Boolean);
};

/**
 * Форматирует маршрут для отображения
 * @param {Array<string>} cities - Массив городов маршрута
 * @return {string} - Отформатированная строка маршрута
 */
const formatTripRoute = (cities) => {
  if (!cities.length) return '';
  
  switch (cities.length) {
    case 1:
      return cities[0];
    case 2:
      return `${cities[0]} — ${cities[1]}`;
    case 3:
      return `${cities[0]} — ${cities[1]} — ${cities[2]}`;
    default:
      return `${cities[0]} — ... — ${cities[cities.length - 1]}`;
  }
};

/**
 * Получает даты начала и окончания поездки
 * @param {Array<Point>} points - Массив точек маршрута
 * @return {Object} - Объект с датами начала и окончания
 */
const getTripDates = (points) => {
  if (!points.length) return { start: '', end: '' };
  
  const sortedPoints = [...points].sort(sortByDay);
  return {
    start: dayjs(sortedPoints[0].dateFrom).format(DATE_FORMAT),
    end: dayjs(sortedPoints[sortedPoints.length - 1].dateTo).format(DATE_FORMAT)
  };
};

/**
 * Вычисляет общую стоимость поездки
 * @param {Array<Point>} points - Массив точек маршрута
 * @param {Array<OfferGroup>} offers - Массив групп предложений
 * @return {number} - Общая стоимость поездки
 */
const calculateTotalPrice = (points, offers) => {
  if (!points.length) return 0;
  
  const basePriceSum = points.reduce((sum, point) => sum + point.basePrice, 0);
  
  const offersPriceSum = points.reduce((sum, point) => {
    const pointOffers = offers.find(offerGroup => offerGroup.type === point.type)?.offers || [];
    const selectedOffers = pointOffers.filter(offer => point.offers.includes(offer.id));
    return sum + selectedOffers.reduce((offerSum, offer) => offerSum + offer.price, 0);
  }, 0);
  
  return basePriceSum + offersPriceSum;
};

export {
  getTripCities,
  formatTripRoute,
  getTripDates,
  calculateTotalPrice
};
