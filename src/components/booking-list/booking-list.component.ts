import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {BookingComponent} from "../booking/booking.component";
import {DatabaseService} from "../../services/database/database.service";
import {BookingRenderer} from "../../renderers/booking.renderer";
import {BookingModel} from "../../models/booking.model";

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
    const bookings: BookingModel[] = await this.databaseService.getBookings();
    bookings.forEach(booking => {
      this.bookingList.push(this.bookingRenderer.render(booking));
    });
  }

}
