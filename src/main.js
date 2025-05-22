import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestionationsModel from './model/destionations-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const destinationsModel = new DestionationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const presenter = new Presenter(
  tripEventsContainerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
);

newPointButton.addEventListener('click', () => {
  presenter.createPoint();
});

new FilterPresenter(filterContainerElement, filterModel, pointsModel).init();
presenter.init();
