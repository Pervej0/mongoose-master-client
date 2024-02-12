import { TQueryParam, TRegisteredSemester, TResponse } from "../../../types";
import { baseAPi } from "../../api/baseApi";

const CourseManagementApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semister-registrations/create-semester-ragistration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    GetAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semister-registrations",
          method: "GET",
          params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (res: TResponse<TRegisteredSemester[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
    UpdateRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: `/semister-registrations/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["semester"],
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} = CourseManagementApi;
