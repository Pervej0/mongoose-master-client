// ===================== Student

type Name = {
  firstName: string;
  lastName: string;
  middleName: string;
};

type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudentData = {
  _id: string;
  id: string;
  name: Name;
  password: string;
  studentProfile: string;
  gender: string;
  dob: string;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup: string;
  presentAdd: string;
  permanentAdd: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  admissionSemester: string;
  academicDepartment: string;
  isDeleted: boolean;
  fullName?: string;
};

export type TStudent = {
  password: string;
  student: TStudentData;
};

// ===================== Student ====================

export type TUserDetails = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// ===================== Admin ======================

export type TAdmin = {
  _id: string;
  id: string;
  user: string;
  designation: string;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};
