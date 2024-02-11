import { TQueryParam, TResponse } from "../../../types";
import { TAdmin, TStudentData } from "../../../types/UserManagement.type";
import { baseAPi } from "../../api/baseApi";

const CreateStudentApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    AddAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    GetAllAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/admins",
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TResponse<TAdmin[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
  }),
});

export const { useAddAdminMutation, useGetAllAdminQuery } = CreateStudentApi;
