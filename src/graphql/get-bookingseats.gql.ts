import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {BookingSeatModel} from "../models/bookingSeat.model";

export interface Response {
    bookingSeats: BookingSeatModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GetBookingSeatsGql extends Query<Response> {
    document = gql`
      query GetBookingSeats($booking: Int, $seat: Int) {
        bookingSeats(booking: $booking, seat: $seat) {
          id
          showtime {
            id
            startTime
            endTime
            movie {
              id
              title
              imageURL
            }
            hall {
              id
              number
            }
          }
          bookingSeats {
            id
            seat {
              id
              row
              number
            }
          }
          user {
            id
            firstName
            lastName
          }
        }
      }
    `;
}
