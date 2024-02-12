import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import { routeGenerator } from "../utils/RouteGenerator";
import { AdminPaths } from "./admin.routes";
import { FacultyPaths } from "./Faculty.routes";
import { StudentPaths } from "./student.routes";
import StudentDashboard from "../pages/Student/StudentDashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";

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
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute role="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
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
