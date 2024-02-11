import { TQueryParam, TResponse } from "../../../types";
import { TFaculty, TStudentData } from "../../../types/UserManagement.type";
import { baseAPi } from "../../api/baseApi";

const CreateStudentApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    AddFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    GetAllFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TResponse<TFaculty[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
  }),
});

export const { useAddFacultyMutation, useGetAllFacultyQuery } =
  CreateStudentApi;
