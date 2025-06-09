import {ShowtimeModel} from "./showtime.model";

export class HallModel {
    id: number;
    number: number;
    showtime: ShowtimeModel|null;

    constructor(id: number, number: number, showtime: ShowtimeModel|null) {
        this.id = id;
        this.number = number;
        this.showtime = showtime;
    }
}
