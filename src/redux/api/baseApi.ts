import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
