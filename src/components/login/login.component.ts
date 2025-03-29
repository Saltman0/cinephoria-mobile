import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {ApiService} from "../../services/api/api.service";
import {DatabaseService} from "../../services/database/database.service";
import {Router} from "@angular/router";
import {UserFactory} from "../../factories/user.factory";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('baudoin.mathieu@protonmail.com', [Validators.required, Validators.email]),
    password: new FormControl('0123456789', [Validators.required])
  });

  constructor(private router: Router,
              private readonly apiService: ApiService,
              private readonly databaseService: DatabaseService,
              private readonly localStorageService: LocalStorageService,
              private readonly userFactory: UserFactory) {}

  async submit() {

    const jwtToken = await this.apiService.login(
        <string>this.loginForm.value.email,
        <string>this.loginForm.value.password
    );

    if (jwtToken !== null) {
      this.localStorageService.addJwtToken(jwtToken.value);

      this.databaseService.openDatabase();

      const responseUser = await this.apiService.getUser(this.localStorageService.getJwtToken());

      const user: UserModel = this.userFactory.create(
        responseUser.id, responseUser.firstName, responseUser.lastName
      );

      this.databaseService.addUser(user);

      this.databaseService.populateDatabase(await this.apiService.getBookings(user.id));
    }

    await this.router.navigate(['booking-list']);
  }
}
