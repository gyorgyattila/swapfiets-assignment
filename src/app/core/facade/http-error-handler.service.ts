import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export abstract class HttpErrorHandlerService {
  /**
   * Handles HTTP errors and logs the error message for a given operation.
   * Returns a fallback result to allow the application to continue functioning.
   *
   * @template T - The type of the result to return in case of an error.
   * @param method - A description of the operation that failed.
   * @param result - The fallback result to return when an error occurs.
   * @returns A function that takes an `HttpErrorResponse` and returns an `Observable` of the fallback result.
   */
  protected handleError<T>(method: string, result?: T) {
    type NewType = Observable<T>;
    return (error: HttpErrorResponse): NewType => {
      console.log(`${method} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
