import {
  BaseQueryApi,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryRefreshToken = async (
  arg: FetchArgs,
  api: BaseQueryApi,
  extra: DefinitionType
): Promise<any> => {
  const result = (await baseQuery(arg, api, extra)) as any;
  if (result?.error?.status === 404) {
    toast.error(result?.error?.data.message);
    return;
  }
  if (result.error?.status === 401) {
    const data = await fetch(
      "http://localhost:4000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => data.data);
    if (data?.accessToken) {
      const user = (api.getState() as RootState).auth.token;
      api.dispatch(setUser({ user, token: data?.accessToken as string }));
      return result;
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseAPi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryRefreshToken as any,
  tagTypes: ["semester", "courses", "offeredCourse"],
  endpoints: () => ({}),
});
