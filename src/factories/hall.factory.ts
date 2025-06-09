import {Injectable} from "@angular/core";
import {Hall} from "../services/database/database.service";

@Injectable({
    providedIn: 'root'
})
export class HallFactory {

    public create(id: number, number: number, showtimeId: number|null): Hall {
      return {
        id: id,
        number: number,
        showtimeId: showtimeId
      }
    }

}
