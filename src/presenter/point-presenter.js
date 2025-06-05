import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType, Mode } from '../utils/const.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #onDataChange = null;
  #onModeChange = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #destination = null;
  #allDestinations = null;
  #allOffers = null;
  #mode = Mode.DEFAULT;
  #originalPoint = null;

  constructor(pointListContainer, onDataChange, onModeChange) {
    this.#pointListContainer = pointListContainer;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point, destination, allDestinations, allOffers) {
    this.#point = point;
    this.#destination = destination;
    this.#allDestinations = allDestinations;

    this.#allOffers = allOffers;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point,
      allDestination: this.#allDestinations,
      allOffers: this.#allOffers,
      onOpenEditButtonClick: this.#onEditClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      isNew: false,
      onSubmit: this.#onFormSubmit,
      onDeleteClick: this.#onDeleteClick,
      onCloseClick: this.#onCloseClick
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

  #onFavoriteClick = () => {
    const updatedPoint = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
      offers: this.#point.offers,
      destination: this.#point.destination
    };

    this.#onDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      updatedPoint
    );
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      if (this.#originalPoint) {
        this.#point = {...this.#originalPoint};
      }
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    this.#originalPoint = {...this.#point};
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    if (this.#originalPoint) {
      this.#point = {...this.#originalPoint};
    }
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if (this.#originalPoint) {
        this.#point = {...this.#originalPoint};
        this.init(this.#point, this.#destination, this.#allDestinations, this.#allOffers);
      }
      this.#replaceFormToPoint();
    }
  };

  #onEditClick = () => {
    this.#onModeChange();
    this.#replacePointToForm();
  };

  #onFormSubmit = async (update) => {
    try {
      this.setSaving();
      await this.#onDataChange(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update
      );
    } catch (error) {
      this.setAborting();
    }
  };

  #onDeleteClick = (point) => {
    this.#onDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #onCloseClick = () => {
    this.#replaceFormToPoint();
  };

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      const newEditComponent = new EditPointView({
        point: this.#point,
        allDestinations: this.#allDestinations,
        allOffers: this.#allOffers,
        isNew: false,
        isSaving: true,
        isDisabled: true,
        isDeleting: false,
        onSubmit: this.#onFormSubmit,
        onDeleteClick: this.#onDeleteClick,
        onCloseClick: this.#onCloseClick
      });

      replace(newEditComponent, this.#pointEditComponent);
      this.#pointEditComponent = newEditComponent;
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      const newEditComponent = new EditPointView({
        point: this.#point,
        allDestinations: this.#allDestinations,
        allOffers: this.#allOffers,
        isNew: false,
        isSaving: false,
        isDisabled: true,
        isDeleting: true,
        onSubmit: this.#onFormSubmit,
        onDeleteClick: this.#onDeleteClick,
        onCloseClick: this.#onCloseClick
      });

      replace(newEditComponent, this.#pointEditComponent);
      this.#pointEditComponent = newEditComponent;
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }
}
