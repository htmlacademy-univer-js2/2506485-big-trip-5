import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointApiService from './points-api-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import LoadingView from './view/loading-view.js';
import ErrorView from './view/error-view.js';

const AUTHORIZATION = 'Basic hS2sfS55scl1sa1';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsApiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel({ apiService: pointsApiService });
const offersModel = new OffersModel({ apiService: pointsApiService });
const pointsModel = new PointsModel({ apiService: pointsApiService });
const filterModel = new FilterModel();

// Создаем экземпляры представлений
const loadingView = new LoadingView();
const errorView = new ErrorView();

// Показываем загрузку
tripEventsContainerElement.innerHTML = '';
tripEventsContainerElement.append(loadingView.element);

// Функция для обработки ошибок
const handleError = () => {
  tripEventsContainerElement.innerHTML = '';
  tripEventsContainerElement.append(errorView.element);
  newPointButton.disabled = true;
};

Promise.all([
  destinationsModel.init().catch(handleError),
  offersModel.init().catch(handleError),
  pointsModel.init().catch(handleError)
])
  .then(() => {
    tripEventsContainerElement.innerHTML = '';
    const presenter = new Presenter(
      tripEventsContainerElement,
      pointsModel,
      destinationsModel,
      offersModel,
      filterModel,
    );

    new FilterPresenter(filterContainerElement, filterModel, pointsModel).init();
    presenter.init();

    newPointButton.addEventListener('click', () => {
      presenter.createPoint();
    });
  })
  .catch(() => {
  });
