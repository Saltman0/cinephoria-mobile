import {Component, Input, OnInit} from '@angular/core';
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
export class BookingComponent implements OnInit {
  @Input() id: number = 0;
  @Input() movieTitle: string = "Nom du film actuel";
  @Input() movieImage: string = "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg";
  @Input() showtimeDate: string = "Date du film actuel";
  @Input() showtimeStartHour: string = "xxhxx";
  @Input() showtimeEndHour: string = "xxhxx";
  @Input() hallNumber: number = 777;
  @Input() seats: string = "A0/B0/C0";

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  displayBookingDetails(bookingId: number) {
    this.router.navigate([`/booking-detail/${bookingId}`]);
  }

}
