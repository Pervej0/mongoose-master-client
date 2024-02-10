import { TQueryParam, TResponse } from "../../../types";
import { TStudent } from "../../../types/User.type";
import { baseAPi } from "../../api/baseApi";

const CreateStudentApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    AddStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    GetAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TResponse<TStudent[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentQuery } =
  CreateStudentApi;