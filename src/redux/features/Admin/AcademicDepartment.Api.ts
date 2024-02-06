import { TQueryParam, TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/AcademicDepartment.type";
import { baseAPi } from "../../api/baseApi";

const AcademicDepartmentApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    AddAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    GetAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-departments",
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TResponse<TAcademicDepartment[]>) => ({
        meta: res.meta,
        data: res.data,
      }),
    }),
  }),
});

export const {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = AcademicDepartmentApi;
