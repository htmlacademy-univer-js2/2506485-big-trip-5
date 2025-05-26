import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType, Mode } from '../utils/const.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #destination = null;
  #allDestinations = null;
  #allOffers = null;
  #mode = Mode.DEFAULT;
  #isFormOpen = false;

  constructor(pointListContainer, onDataChange, onModeChange) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destination, allDestinations, allOffers) {
    this.#point = point;
    this.#destination = destination;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers; 

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(
      point,
      allDestinations,
      allOffers,
      this.#handleEditClick,
      this.#handleFavoriteClick,
    );

    this.#pointEditComponent = new EditPointView({
      point,
      allDestinations,
      allOffers,
      isNew: false,
      onSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseClick: this.#handleCloseClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite,
        destination: this.#point.destination,
        offers: [...this.#point.offers]
      }
    );
  };

  resetView = () => {
    this.#isFormOpen = false;
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#handleModeChange();
    this.#replacePointToForm();
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleCloseClick = () => {
    this.#replaceFormToPoint();
  };
}
