import {Injectable} from "@angular/core";
import {CinemaModel} from "../models/cinema.model";

@Injectable({
    providedIn: 'root'
})
export class CinemaFactory {

  public create(
    id: number,
    name: string,
    address: string,
    postalCode: number,
    city: string,
    phoneNumber: string,
    openHour: Date,
    closeHour: Date
  ): CinemaModel {
    return new CinemaModel(id, name, address, postalCode, city, phoneNumber, openHour, closeHour);
  }

}
