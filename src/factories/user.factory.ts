import {Injectable} from "@angular/core";
import {UserModel} from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserFactory {

  public create(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string
  ): UserModel {
    return new UserModel(id, email, password, firstName, lastName, phoneNumber, role);
  }

}
