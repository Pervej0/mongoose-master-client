import { TAcademicFaculty } from "../../../types/AcademicFaculty.type";
import { TQueryParam, TResponse } from "../../../types/global.type";
import { baseAPi } from "../../api/baseApi";

const AcademicFacultyApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    AddAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    GetAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TResponse<TAcademicFaculty[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
  }),
});

export const { useAddAcademicFacultyMutation, useGetAllAcademicFacultyQuery } =
  AcademicFacultyApi;
