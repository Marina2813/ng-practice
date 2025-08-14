export interface BaseResponse<T> {
  message: string;
  result: T;
}