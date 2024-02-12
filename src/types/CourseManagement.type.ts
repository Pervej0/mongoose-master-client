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

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: any[];
  __v: number;
};
export interface TAssignFaculty {
  _id: string;
  __v: number;
  course: string;
  faculties: string[];
}
export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
