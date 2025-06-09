import {Injectable} from "@angular/core";
import {Movie} from "../services/database/database.service";

@Injectable({
    providedIn: 'root'
})
export class MovieFactory {

    public create(id: number, title: string, imageURL: string, showtimeId: number): Movie {
        return {
          id: id,
          title: title,
          imageURL: imageURL,
          showtimeId: showtimeId
        }
    }

}
