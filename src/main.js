import Presenter from './presenter/presenter.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
new Presenter(filterContainerElement, tripEventsContainerElement).init();
