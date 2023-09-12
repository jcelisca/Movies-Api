import { HttpErrorResponse } from "@angular/common/http";

export interface ErrorData extends HttpErrorResponse {
  message: string;
}
