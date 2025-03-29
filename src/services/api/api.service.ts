import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { fetch } from "@tauri-apps/plugin-http";
import { HallModel } from "../../models/hall.model";
import { GetBookingsGql } from "../../graphql/get-bookings.gql";
import { HallFactory } from "../../factories/hall.factory";
import { Incident } from "../../models/incident.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://172.18.0.6/';

  constructor(private readonly getHallsGQL: GetBookingsGql, private readonly hallFactory: HallFactory) {}

  public async login(email: string, password: string): Promise<any> {
    const response = await fetch(this.apiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, password: password})
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getUser(token: string) {
    const userId: number = jwtDecode<{id: number}>(token).id;
    const response: Response = await fetch(this.apiUrl + `user/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getHalls(cinemaId: number) {

    let halls: HallModel[] = [];

    let result = await this.getHallsGQL.watch(
        { cinemaId: cinemaId }
    ).result();

    result.data.halls.forEach((hall: HallModel) => {
      halls.push(this.hallFactory.create(hall.id, hall.number, hall.currentShowtime, hall.incidents));
    });

    return halls;
  }

  public async postIncident(incident: Incident, token: string) {
    const response: Response = await fetch(this.apiUrl + "incident", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"type": incident.type, "description": incident.description, "hall": incident.hall}),
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

}
