import {
  TAcademicSemester,
  TQueryParam,
  TReduxResponse,
} from "../../../types/global.type";
import { baseAPi } from "../../api/baseApi";

const AcademicSemesterApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformErrorResponse: (
        response: TReduxResponse<TAcademicSemester[]>
      ) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
} = AcademicSemesterApi;
