// presenter/new-point-presenter.js
import EditPointView from '../view/edit-point-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, Mode } from '../utils/const.js';
import { EMPTY_POINT } from '../utils/const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #pointEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #mode = Mode.DEFAULT;
  #onAddButtonUnblock = null;

  constructor(pointListContainer, onDataChange, onModeChange, destinationsModel, offersModel) {
  this.#pointListContainer = pointListContainer;
  this.#handleDataChange = onDataChange;
  this.#handleModeChange = onModeChange;
  this.#destinationsModel = destinationsModel;
  this.#offersModel = offersModel;
}

destroy = () => {
  if (this.#pointEditComponent === null) {
    return;
  }

  document.removeEventListener('keydown', this.#escKeyDownHandler);
  this.#mode = Mode.DEFAULT;

  this.#handleModeChange();
  remove(this.#pointEditComponent);
  this.#pointEditComponent = null;
};

resetView = () => {
  if (this.#mode !== Mode.CREATING) {
    return;
  }
  this.destroy();
};

  init() {
    if (this.#mode === Mode.CREATING) {
      return;
    }

    this.#handleModeChange();

    const destinations = this.#destinationsModel.getDestinations();
    const offersByType = this.#offersModel.getOffers();

    this.#pointEditComponent = new EditPointView({
      point: EMPTY_POINT,
      allDestinations: destinations,
      allOffers: offersByType,
      isNew: true,
      onSubmit: this.#handleFormSubmit,
      onDeleteClick: this.destroy,
      onCloseClick: this.destroy
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.CREATING;
  }

  #handleFormSubmit = async (point) => {
  try {
    this.setSaving();
    await this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy();
  } catch (error) {
    this.setAborting();
  }
};

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }
}
