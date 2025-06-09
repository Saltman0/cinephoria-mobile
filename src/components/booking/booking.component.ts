import {Component, Input} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [
    NgOptimizedImage,
    NgStyle
  ]
})
export class BookingComponent  {
  @Input() id: number = 0;
  @Input() movieTitle: string = "Titre du film";
  @Input() movieImage: string = "Titre_du_film.png";
  @Input() showtimeDate: string = "Date du film actuel";
  @Input() showtimeStartHour: string = "xx";
  @Input() showtimeStartMinute: string = "xx";
  @Input() showtimeEndHour: string = "xx";
  @Input() showtimeEndMinute: string = "xx";
  @Input() hallNumber: number = 777;
  @Input() seats: string = "A0/B0/C0";

  constructor(private readonly router: Router) {}

  displayBookingDetails(bookingId: number) {
    this.router.navigate([`/booking-detail/${bookingId}`]);
  }

}
