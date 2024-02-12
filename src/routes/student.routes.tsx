import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const StudentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Create Admin",
    path: "create-admin",
    element: <CreateAdmin />,
  },
];
