import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestionationsModel from './model/destionations-model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestionationsModel();
const offersModel = new OffersModel();
new Presenter(filterContainerElement, tripEventsContainerElement, pointsModel, destinationsModel, offersModel).init();
