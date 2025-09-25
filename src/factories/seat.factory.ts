import {Injectable} from "@angular/core";
import {HallModel} from "../models/hall.model";
import {SeatModel} from "../models/seat.model";

@Injectable({
    providedIn: 'root'
})
export class SeatFactory {

  public create(
    id: number,
    row: string,
    number: number,
    hall: HallModel
  ): SeatModel {
    return new SeatModel(id, row, number, hall);
  }

}
