import {Component, Input, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {QRCodeComponent} from "angularx-qrcode";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {BookingRenderer} from "../../renderers/booking.renderer";
import {Booking, DatabaseService} from "../../services/database/database.service";

@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
  imports: [HeaderComponent, QRCodeComponent, NgOptimizedImage, NgStyle]
})
export class BookingDetailComponent implements OnInit  {

  @Input() id: number = 0;
  @Input() movieTitle: string|null = "Titre du film";
  @Input() movieImage: string|null = "Titre_du_film.png";
  @Input() showtimeDate: string|null = "Date du film actuel";
  @Input() showtimeStartHour: string|null = "xx";
  @Input() showtimeStartMinute: string|null = "xx";
  @Input() showtimeEndHour: string|null = "xx";
  @Input() showtimeEndMinute: string|null = "xx";
  @Input() hallNumber: number|null = 1;
  @Input() seats: string|null = "A22/A23/A24";
  @Input() qrCode: string = "";

  constructor(private readonly databaseService: DatabaseService,
              private readonly bookingRenderer: BookingRenderer,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const bookingId: number = Number(this.activatedRoute.snapshot.paramMap.get('bookingId'));

    const booking: Booking|null = await this.databaseService.getBooking(bookingId) ?? null;
    if (booking !== null) {
      const result = await this.bookingRenderer.renderBooking(booking);
      this.movieTitle = result.movieTitle;
      this.movieImage = result.movieImage;
      this.showtimeDate = result.showtimeDate;
      this.showtimeStartHour = result.showtimeStartHour;
      this.showtimeStartMinute = result.showtimeStartMinute;
      this.showtimeEndHour = result.showtimeEndHour;
      this.showtimeEndMinute = result.showtimeEndMinute;
      this.hallNumber = result.hallNumber;
      this.seats = result.seats;
      this.qrCode = JSON.stringify(result.qrCode);
    }
  }

  returnToBookingList(): void {
    this.router.navigate(['/booking-list']);
  }
}
