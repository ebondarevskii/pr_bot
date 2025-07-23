import { Method } from "axios";

export type TRequestParams<D> = {
  url: string;
  method?: Method;
  data?: D;
  params?: any;
  headers?: any;
  timeout?: number;
};
