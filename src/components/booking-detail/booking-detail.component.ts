import {Component, Input, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {QRCodeComponent} from "angularx-qrcode";
import {NgOptimizedImage} from "@angular/common";
import {BookingRenderer} from "../../renderers/booking.renderer";

@Component({
  selector: 'app-booking-list',
  standalone: true,
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
  imports: [HeaderComponent, QRCodeComponent, NgOptimizedImage]
})
export class BookingDetailComponent implements OnInit {

  @Input() movieTitle: string = "Nom du film actuel";
  @Input() movieImage: string = "Lien vers l'image";
  @Input() showtimeDate: string = "Date du film actuel";
  @Input() showtimeStartHour: string = "xxhxx";
  @Input() showtimeEndHour: string = "xxhxx";
  @Input() hallNumber: number = 777;
  @Input() seats: string = "A0/B0/C0";
  @Input() qrCode: string = "https://github.com/Cordobo/angularx-qrcode";

  constructor(private readonly bookingRenderer: BookingRenderer) {}

  ngOnInit() {}

}
