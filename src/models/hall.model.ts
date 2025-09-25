import {CinemaModel} from "./cinema.model";

export class HallModel {
    id: number;
    number: number;
    projectionQuality: string;
    cinema: CinemaModel

    constructor(id: number, number: number, projectionQuality: string, cinema: CinemaModel) {
        this.id = id;
        this.number = number;
        this.projectionQuality = projectionQuality;
        this.cinema = cinema;
    }
}
