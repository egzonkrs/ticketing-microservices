export interface ErrorObject {
  message: string;
  field: string;
}

export interface InputErrors {
  errors: ErrorObject[];
}