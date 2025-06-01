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

const loadingView = new LoadingView();
const errorView = new ErrorView();

const showLoading = () => {
  tripEventsContainerElement.innerHTML = '';
  tripEventsContainerElement.append(loadingView.element);
  newPointButton.disabled = true;
};

const showError = () => {
  tripEventsContainerElement.innerHTML = '';
  tripEventsContainerElement.append(errorView.element);
  newPointButton.disabled = true;
};

const initApp = () => {
  const presenter = new Presenter(
    tripEventsContainerElement,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
    showError // Передаем функцию showError в презентер
  );

  const filterPresenter = new FilterPresenter(
    filterContainerElement,
    filterModel,
    pointsModel
  );

  filterPresenter.init();
  presenter.init();
  
  if (pointsModel.getPoints().length > 0) {
    newPointButton.disabled = false;
  }
  
  newPointButton.addEventListener('click', () => {
    presenter.createPoint();
  });
};

const initApplication = async () => {
  showLoading();
  
  try {
    // Пытаемся загрузить все данные
    await Promise.all([
      destinationsModel.init(),
      offersModel.init(),
      pointsModel.init()
    ]);
    
    // Проверяем, что все критически важные данные загрузились
    if (destinationsModel.getDestinations().length === 0 || 
        offersModel.getOffers().length === 0) {
      throw new Error('Critical data failed to load');
    }
    
    // Если всё загрузилось успешно - инициализируем приложение
    tripEventsContainerElement.innerHTML = '';
    initApp();
  } catch (error) {
    console.error('Failed to load data:', error);
    showError();
  }
};

initApplication();