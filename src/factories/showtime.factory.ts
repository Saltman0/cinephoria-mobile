import {Injectable} from "@angular/core";
import {ShowtimeModel} from "../models/showtime.model";
import {MovieModel} from "../models/movie.model";
import {HallModel} from "../models/hall.model";

@Injectable({
    providedIn: 'root'
})
export class ShowtimeFactory {

  public create(
    id: number,
    startTime: Date,
    endTime: Date,
    price: number,
    movie: MovieModel,
    hall: HallModel
  ): ShowtimeModel {
    return new ShowtimeModel(id, startTime, endTime, price, movie, hall);
  }

}
