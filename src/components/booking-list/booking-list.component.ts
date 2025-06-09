import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {BookingComponent} from "../booking/booking.component";
import {Booking, DatabaseService} from "../../services/database/database.service";
import {BookingRenderer} from "../../renderers/booking.renderer";

@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  imports: [HeaderComponent, BookingComponent]
})
export class BookingListComponent implements OnInit {

  bookingList: any[] = [];

  constructor(private readonly databaseService: DatabaseService, private readonly bookingRenderer: BookingRenderer) {}

  async ngOnInit(): Promise<void> {
    const bookings: Booking[] = await this.databaseService.getBookings(1);
    for (const booking of bookings) {
      this.bookingList.push(await this.bookingRenderer.render(booking));
    }
  }

}
