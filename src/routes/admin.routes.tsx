import { ReactNode } from "react";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";
import { NavLink } from "react-router-dom";

type TAdminRoutes = {
  path: string;
  element: ReactNode;
};

type TAdminSidebar = {
  key: string;
  label: ReactNode;
  children?: TAdminSidebar[];
};

export const AdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
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
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

export const AdminRoutes = AdminPaths.reduce((acc: TAdminRoutes[], item) => {
  if (item.path && item.element) {
    acc.push({ path: item.path, element: item.element });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

export const AdminSidebar = AdminPaths.reduce((acc: TAdminSidebar[], item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: <NavLink to={item.path}>{item.name}</NavLink>,
    });
  }
  if (item.children) {
    const childElem = item.children.map((child) => {
      return {
        key: child.name,
        label: <NavLink to={child.path}>{child.name}</NavLink>,
      };
    });
    acc.push({ key: item.name, label: item.name, children: childElem });
  }
  return acc;
}, []);
