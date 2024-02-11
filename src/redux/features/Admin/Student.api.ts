import { TQueryParam, TResponse } from "../../../types";
import { TAdmin, TStudentData } from "../../../types/UserManagement.type";
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
      transformResponse: (res: TResponse<TStudentData[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
    GetSingleStudent: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
} = CreateStudentApi;
