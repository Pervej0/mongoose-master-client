import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import { AdminPaths } from "./admin.routes";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import { routeGenerator } from "../utils/RouteGenerator";
import { FacultyPaths } from "./Faculty.routes";
import { StudentPaths } from "./student.routes";
import StudentDashboard from "../pages/Student/StudentDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      ...routeGenerator(AdminPaths),
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/faculty",
    element: <App />,
    children: [
      ...routeGenerator(FacultyPaths),
      {
        index: true,
        element: <FacultyDashboard />,
      },
    ],
  },
  {
    path: "/student",
    element: <App />,
    children: [
      ...routeGenerator(StudentPaths),
      {
        index: true,
        element: <StudentDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
