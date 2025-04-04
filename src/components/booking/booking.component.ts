import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  @Input() movieTitle: string = "Nom du film actuel";
  @Input() showtimeDate: string = "Date du film actuel";
  @Input() showtimeStartHour: string = "xxhxx";
  @Input() showtimeEndHour: string = "xxhxx";
  @Input() hallNumber: number = 777;
  @Input() seats: number = 777;

  constructor() { }

  ngOnInit() {}

}
