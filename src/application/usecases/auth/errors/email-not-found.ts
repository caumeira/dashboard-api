export class EmailNotFound extends Error {
  constructor() {
    super('Email not found!');

    this.name = 'EmailNotFound';
  }
}
