import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [
    NgOptimizedImage
  ]
})
export class BookingComponent implements OnInit {
  @Input() movieTitle: string = "Nom du film actuel";
  @Input() movieImage: string = "Lien vers l'image";
  @Input() showtimeDate: string = "Date du film actuel";
  @Input() showtimeStartHour: string = "xxhxx";
  @Input() showtimeEndHour: string = "xxhxx";
  @Input() hallNumber: number = 777;
  @Input() seats: string = "A0/B0/C0";
  @Input() qrCode: string = "qrCode";

  constructor() { }

  ngOnInit() {}

}
