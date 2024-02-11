import { useParams } from "react-router-dom";
import { useSingleFacultyQuery } from "../../../redux/features/Admin/Faculty.api";

const FacultyDetails = () => {
  const { facultyId } = useParams();
  const { data, isLoading } = useSingleFacultyQuery(facultyId);

  if (isLoading) {
    return <h4>Loading....</h4>;
  }

  console.log(data);
  const { designation, fullName, profileImg, academicDepartment } = data.data;
  return (
    <div>
      <div>
        <img width={300} src={profileImg} alt="profile" />
        <h1>{fullName}</h1>
        <h2>Designation:{designation}</h2>
        <h2>Academic Department: {academicDepartment?.name}</h2>
      </div>
    </div>
  );
};

export default FacultyDetails;
