import {Injectable} from "@angular/core";
import {HallModel} from "../models/hall.model";
import {CinemaModel} from "../models/cinema.model";

@Injectable({
    providedIn: 'root'
})
export class HallFactory {

  public create(id: number, number: number, projectionQuality: string, cinema: CinemaModel): HallModel {
    return new HallModel(id, number, projectionQuality, cinema);
  }

}
