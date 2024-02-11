import AdminDashboard from "../pages/Admin/AdminDashboard";
import AcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/CreateAcademicFaculty";
import CreateAcademicDepartment from "../pages/Admin/AcademicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/Admin/AcademicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty";
import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/UserManagement/CreateStudent";
import StudentData from "../pages/Admin/UserManagement/StudentsData";
import AdminData from "../pages/Admin/UserManagement/AdminData";
import FacultyData from "../pages/Admin/UserManagement/FacultyData";
import StudentDetails from "../pages/Admin/UserManagement/StudentDetails";
import AdminDetails from "../pages/Admin/UserManagement/AdminDetails";
import FacultyDetails from "../pages/Admin/UserManagement/FacultyDetails";

export const AdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semesters",
        path: "create-academic-semesters",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semesters",
        path: "academic-semesters",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "All Admin",
        path: "admins",
        element: <AdminData />,
      },
      {
        path: "admin-data/:adminId",
        element: <AdminDetails />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "All Faculty",
        path: "faculites",
        element: <FacultyData />,
      },
      {
        path: "faculty-data/:facultyId",
        element: <FacultyDetails />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "All Students",
        path: "students",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
    ],
  },
];
