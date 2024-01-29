import { baseAPi } from "../../api/baseApi";

export const authApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: { id: userInfo.name, password: userInfo.password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
