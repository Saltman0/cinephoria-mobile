import {Injectable} from "@angular/core";
import {Seat} from "../services/database/database.service";

@Injectable({
    providedIn: 'root'
})
export class SeatFactory {

    public create(id: number, row: string, number: number): Seat {
      return {
        id: id,
        row: row,
        number: number
      }
    }

}
