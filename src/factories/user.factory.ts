import {Injectable} from "@angular/core";
import {User} from "../services/database/database.service";

@Injectable({
    providedIn: 'root'
})
export class UserFactory {

    public create(id: number, firstName: string, lastName: string): User {
        return {
          id: id,
          firstName: firstName,
          lastName: lastName
        }
    }

}
