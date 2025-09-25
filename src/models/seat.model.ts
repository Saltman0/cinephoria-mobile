import {HallModel} from "./hall.model";

export class SeatModel {
    id: number;
    row: string;
    number: number;
    hall: HallModel;

    constructor(id: number, row: string, number: number, hall: HallModel) {
        this.id = id;
        this.number = number;
        this.row = row;
        this.hall = hall;
    }
}
