import dayjs from 'dayjs';

const FORMAT_TIME = 'HH:mm';
const FORMAT_DAY = 'MMM DD';
const FORMAT_FULL_DATE = 'DD/MM/YY HH:mm';

const getFormatTime = (time) => dayjs(time).format(FORMAT_TIME);

const getFormatDay = (date) => dayjs(date).format(FORMAT_DAY);

const getFormatFullDate = (date) => dayjs(date).format(FORMAT_FULL_DATE);

const isDatesEqual = (date1, date2) => dayjs(date1).isSame(date2);

const getDuration = (dateFrom, dateTo) => {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);
  const difference = endTime.diff(startTime, 'minute');
  const numberMinutesDay = 24 * 60;
  const numberMinetesHour = 60;

  if (difference > numberMinutesDay){
    const days = Math.floor(difference / numberMinutesDay);
    const remainder = difference - (days * numberMinutesDay);
    const hours = Math.floor(remainder / numberMinetesHour);
    const minutes = remainder - hours * numberMinetesHour;
    return `${String(days).padStart(2,'0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (difference > numberMinetesHour){
    const hours = Math.floor(difference / numberMinetesHour);
    const minutes = difference - (hours * numberMinetesHour);
    return `${String(hours).padStart(2,'0')}H ${String(minutes).padStart(2,'0')}M`;
  } else {
    return `${String(difference).padStart(2,'0')}M`;
  }
};

const isPastPoint = (point) => dayjs(point.dateFrom).isBefore(dayjs());

function updatePointData(points, updatedPointData) {
  return points.map((point) => point.id === updatedPointData.id ? updatedPointData : point);
}

const isPresentPoint = (point) => dayjs(point.dateFrom).isBefore((dayjs())) && dayjs(point.dateTo).isAfter((dayjs()));

const isFuturePoint = (point) => dayjs(point.dateFrom).isAfter(dayjs());

export {getFormatTime, getFormatDay, getDuration, getFormatFullDate, isFuturePoint, isPastPoint, isPresentPoint, updatePointData, isDatesEqual};
