import {ShowtimeModel} from "./showtime.model";

export class MovieModel {
    id: number;
    title: string;
    imageURL: string;
    showtime: ShowtimeModel;

    constructor(id: number, title: string, imageURL: string, showtime: ShowtimeModel) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.showtime = showtime;
    }
}
