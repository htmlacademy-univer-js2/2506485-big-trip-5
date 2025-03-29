import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js'  
import {render} from '../framework/render.js';

export default class Presenter {
  pointListComponent = new PointListView();

  constructor(filterContainer, tripEventsContainer, pointsModel, destinationsModel, offersModel) {
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    const points = [...this.pointsModel.getPoints()];

    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.pointListComponent, this.tripEventsContainer);

    render(new EditPointView(points[0], this.destinationsModel.getDestinationById(points[0].destination), points[0].offers.map((offerId) => this.offersModel.getOfferById(offerId))), this.pointListComponent.element);

    for (let i = 1; i < points.length; i++) {
      render(new PointView(points[i], this.destinationsModel.getDestinationById(points[i].destination), points[i].offers.map((offerId) => this.offersModel.getOfferById(offerId))), this.pointListComponent.element);
    }

    render(new AddNewPointView(), this.pointListComponent.element);
  }
}
