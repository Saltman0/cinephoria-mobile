export class UserModel {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;


  constructor(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
}
