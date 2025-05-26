import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointApiService from './points-api-service.js';
import DestinationsModel from './model/destionations-model.js';
import OffersModel from './model/offers-model.js';

const AUTHORIZATION = 'Basic hS2sfS55scl1sa1k';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsApiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel({ apiService: pointsApiService });
const offersModel = new OffersModel({ apiService: pointsApiService });
const pointsModel = new PointsModel({apiService: pointsApiService});
const filterModel = new FilterModel();

destinationsModel.init();
offersModel.init();
pointsModel.init();

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
