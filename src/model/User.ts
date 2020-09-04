export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password?: string
  ) {}

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getEmail() {
    return this.email;
  }
  public getPassword() {
    return this.password;
  }

  public setName(name: string) {
    this.name = name;
  }
  public setEmail(email: string) {
    this.email = email;
  }
  public setPassword(password: string) {
    this.password = password;
  }

  static userModel(user: any): User {
    return new User(user.id, user.name, user.email);
  }
}

export interface UserSignupDTO {
  name: string;
  email: string;
  password: string;
}
