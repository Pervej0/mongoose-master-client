import { baseAPi } from "../../api/baseApi";

export const AcademicSemesterApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAcademicSemesterQuery } = AcademicSemesterApi;
