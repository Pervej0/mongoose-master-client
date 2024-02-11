import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/Admin/Student.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data, isLoading } = useGetSingleStudentQuery(studentId);

  if (isLoading) {
    return <h4>Loading....</h4>;
  }

  const {
    studentProfile,
    fullName,
    academicDepartment,
    admissionSemester,
    academicFaculty,
  } = data.data;
  console.log(data);
  return (
    <div>
      <div>
        <img width={300} src={studentProfile} alt="profile" />
        <h1>{fullName}</h1>
        <h2>Admission Semestier:{admissionSemester?.name}</h2>
        <h2>Academic Department:{academicDepartment?.name}</h2>
        <h2>Academic Faculty:{academicFaculty?.name}</h2>
      </div>
    </div>
  );
};

export default StudentDetails;
