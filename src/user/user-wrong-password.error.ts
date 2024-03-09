export class UserWrongPasswordError extends Error {
  constructor(msg?: string) {
    super(msg);
  }
}
