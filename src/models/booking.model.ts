import {ShowtimeModel} from "./showtime.model";
import {UserModel} from "./user.model";

export class BookingModel {
    id: number;
    user: UserModel;
    showtime: ShowtimeModel;

    constructor(id: number, user: UserModel, showtime: ShowtimeModel) {
        this.id = id;
        this.user = user;
        this.showtime = showtime;
    }
}
