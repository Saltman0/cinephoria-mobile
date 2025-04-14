import {Component, Input, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {QRCodeComponent} from "angularx-qrcode";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
  imports: [HeaderComponent, QRCodeComponent, NgOptimizedImage, NgStyle]
})
export class BookingDetailComponent implements OnInit {

  @Input() id: number = 0;
  @Input() movieTitle: string = "Avengers : Infinity War";
  @Input() movieImage: string = "Avengers_-_Infinity_War.png";
  @Input() showtimeDate: string = "12/04/2025";
  @Input() showtimeStartHour: string = "21h00";
  @Input() showtimeEndHour: string = "23h30";
  @Input() hallNumber: number = 1;
  @Input() seats: string = "A22/A23/A24";
  @Input() qrCode: string = "https://github.com/Cordobo/angularx-qrcode";

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  returnToBookingList(): void {
    this.router.navigate(['/booking-list']);
  }
}
