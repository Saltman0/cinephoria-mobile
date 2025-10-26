import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private bookingApiUrl = environment.BOOKING_API_URL;
  private infrastructureApiUrl = environment.INFRASTRUCTURE_API_URL;
  private movieApiUrl = environment.MOVIE_API_URL;
  private showtimeApiUrl = environment.SHOWTIME_API_URL;
  private userApiUrl = environment.USER_API_URL;

  public async login(email: string, password: string): Promise<any> {
    const response: Response = await fetch(this.userApiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email, password: password})
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getUser(token: string) {
    let userId: number;
    try {
      userId = jwtDecode<{ id: number }>(token).id;
    } catch (error) {
      throw new Error("Invalid token.");
    }

    const response: Response = await fetch(`${this.userApiUrl}user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return response.json();
  }

  public async getBookings(userId: number|null, showtimeId: number|null): Promise<any> {
    let queryParams: string|null = null;

    if (userId !== null && showtimeId !== null) {
      queryParams = "?userId=" + encodeURIComponent(userId) + "&showtimeId=" + encodeURIComponent(showtimeId);
    } else if (userId !== null) {
      queryParams = "?userId=" + encodeURIComponent(userId);
    } else if (showtimeId !== null) {
      queryParams = "?showtimeId=" + encodeURIComponent(showtimeId);
    }

    const response: Response = await fetch(this.bookingApiUrl + `booking` + queryParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getShowtime(showtimeId: number): Promise<any> {
    const response: Response = await fetch(this.showtimeApiUrl + `showtime/${showtimeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getMovie(movieId: number): Promise<any> {
    const response: Response = await fetch(this.movieApiUrl + `movie/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getBookingSeats(bookingId: number): Promise<any> {
    const response: Response = await fetch(
        this.bookingApiUrl + `booking/${encodeURIComponent(bookingId)}/bookingSeats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
    );

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getSeat(seatId: number): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + `seat/${seatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

  public async getHall(hallId: number): Promise<any> {
    const response: Response = await fetch(this.infrastructureApiUrl + `hall/${hallId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  }

}
