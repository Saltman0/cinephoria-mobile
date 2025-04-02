import { Routes } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { BookingComponent } from "../booking/booking.component";
import { BookingListComponent } from "../booking-list/booking-list.component";

export const root: string = "http://localhost:4200/";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', title: "Login page", component: LoginComponent },
  { path: 'booking-list', title: "Booking list page", component: BookingListComponent },
  { path: 'booking', title: "Booking page", component: BookingComponent }
];
