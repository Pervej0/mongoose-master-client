import { TAcademicSemesterResponse } from "./academicSemester.type";

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemesterResponse;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
