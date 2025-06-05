import EditPointView from '../view/edit-point-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, Mode } from '../utils/const.js';
import { EMPTY_POINT } from '../utils/const.js';
import { replace } from '../framework/render.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #onDataChange = null;
  #onModeChange = null;
  #pointEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #mode = Mode.DEFAULT;
  #isSaving = false;
  #isDeleting = false;
  #isDisabled = false;

  constructor(pointListContainer, onDataChange, onModeChange, destinationsModel, offersModel) {
    this.#pointListContainer = pointListContainer;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
    this.#onModeChange();
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

    this.#onModeChange();

    const destinations = this.#destinationsModel.getDestinations();
    const offersByType = this.#offersModel.getOffers();

    this.#pointEditComponent = new EditPointView({
      point: EMPTY_POINT,
      allDestinations: destinations,
      allOffers: offersByType,
      isNew: true,
      isSaving: this.#isSaving,
      isDeleting: this.#isDeleting,
      isDisabled: this.#isDisabled,
      onSubmit: this.#onFormSubmit,
      onDeleteClick: this.destroy,
      onCloseClick: this.destroy
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.CREATING;
  }

  #onFormSubmit = async (point) => {
    if (this.#pointEditComponent === null) {
      return;
    }

    try {
      this.setSaving();
      await this.#onDataChange(
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

  setSaving = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#isSaving = true;
    this.#isDisabled = true;
    this.#recreateEditComponent();
  };

  setAborting = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    const resetFormState = () => {
      this.#isSaving = false;
      this.#isDisabled = false;
      this.#recreateEditComponent();
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #recreateEditComponent = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    const destinations = this.#destinationsModel.getDestinations();
    const offersByType = this.#offersModel.getOffers();

    const newEditComponent = new EditPointView({
      point: EMPTY_POINT,
      allDestinations: destinations,
      allOffers: offersByType,
      isNew: true,
      isSaving: this.#isSaving,
      isDeleting: this.#isDeleting,
      isDisabled: this.#isDisabled,
      onSubmit: this.#onFormSubmit,
      onDeleteClick: this.destroy,
      onCloseClick: this.destroy
    });

    replace(newEditComponent, this.#pointEditComponent);
    this.#pointEditComponent = newEditComponent;
  };
}
