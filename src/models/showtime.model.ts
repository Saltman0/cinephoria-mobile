import {MovieModel} from "./movie.model";
import {HallModel} from "./hall.model";

export class ShowtimeModel {
    id: number;
    startTime: Date;
    endTime: Date;
    price: number;
    movie: MovieModel;
    hall: HallModel;

    constructor(id: number, startTime: Date, endTime: Date, price: number, movie: MovieModel, hall: HallModel) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.movie = movie;
        this.hall = hall;
    }
}
