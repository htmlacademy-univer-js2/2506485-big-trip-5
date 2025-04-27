import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../utils/const.js';

export default class PointPresenter {
  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #onDateChange = null;
  #onModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(container, point, destinations, offers, onDateChange, onModeChange) {
    this.container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDateChange = onDateChange;
    this.#onModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointCompanent = this.#pointComponent;
    const prevEditPointCompanent = this.#editPointComponent;
    this.#pointComponent = new PointView(point, this.#destinations, this.#offers, this.#replacePointToEditForm, this.#addFavoriteClick);
    this.#editPointComponent = new EditPointView(point, this.#destinations, this.#offers, this.#replaceEditFormToPoint, this.#replacePointToEditForm);
    if (prevPointCompanent === null || prevEditPointCompanent === null) {
      render(this.#pointComponent, this.container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointCompanent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointCompanent);
    }
    remove(prevEditPointCompanent);
    remove(prevPointCompanent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #addFavoriteClick = () => {
    this.#onDateChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };
}
