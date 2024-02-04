import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);

  console.log(data);
  return (
    <div>
      <h2>Academic Semesterddddddd</h2>
    </div>
  );
};

export default AcademicSemester;
