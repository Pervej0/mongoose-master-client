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

type Student = {
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
};

export type TStudent = {
  password: string;
  student: Student;
};

// ===================== Admin =================
