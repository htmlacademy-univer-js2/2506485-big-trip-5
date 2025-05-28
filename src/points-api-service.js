import ApiService from './framework/api-service';
import { Method } from './utils/const';
import { adaptToServer } from './utils/adapter';

export default class PointApiService extends ApiService{
  get points (){
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  get offers (){
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  async updatePoint (point){
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }

}
