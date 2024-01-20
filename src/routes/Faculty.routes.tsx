import AcademicSemester from "../pages/Admin/AcademicSemester";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

export const FacultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Academic Semesters",
    path: "academic-semesters",
    element: <AcademicSemester />,
  },
];
