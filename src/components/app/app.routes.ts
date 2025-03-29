import { Routes } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { BookingComponent } from "../booking/booking.component";
import { BookingListComponent } from "../booking-list/booking-list.component";

export const root: string = "http://localhost:8100/";

export const routes: Routes = [
  { path: 'login', title: "Login page", component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'booking-list', title: "Showtime list page", component: BookingListComponent },
  { path: 'booking', title: "Showtime page", component: BookingComponent }
];
