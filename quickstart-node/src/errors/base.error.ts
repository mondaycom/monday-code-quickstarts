/**
 * This is the base custom error class, feel free to add more properties if needed
 */
export abstract class BaseError extends Error {
  abstract readonly statusCode: number;
  abstract readonly logging: boolean;
  readonly message: string;

  protected constructor(message: string) {
    super(message);
    this.message = message;
  }
}
