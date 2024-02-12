import {
  TCourse,
  TOfferedCourse,
  TQueryParam,
  TRegisteredSemester,
  TResponse,
} from "../../../types";
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
    AddCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    GetAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (res: TResponse<TCourse[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
    UpdateCourse: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    AddOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
    GetCourseFaculties: builder.query({
      query: (id) => ({
        url: `courses/${id}/faculty`,
        method: "GET",
      }),
    }),
    GetAllOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (res: TResponse<TOfferedCourse[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useAddCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
  useUpdateCourseMutation,
  useAddOfferedCourseMutation,
  useGetAllOfferedCourseQuery,
} = CourseManagementApi;
