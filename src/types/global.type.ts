import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export type TAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: number;
  startMonth: string;
  endMonth: string;
};

export type TError = {
  data: {
    success: boolean;
    message: string;
    stack: string;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  message: string;
  success: boolean;
};

export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TFilter = {
  text: string;
  value: string;
};
