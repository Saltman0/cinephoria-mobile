import { User } from "../models/user.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserFactory {

    public create(id: number, firstName: string, lastName: string): User {
        return new User(id, firstName, lastName);
    }

}