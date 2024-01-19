const AdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "NODE",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "NODE",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "NODE",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "NODE",
      },
    ],
  },
];

const AdminRoutes = AdminPaths.reduce((acc, item) => {
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

console.log(AdminRoutes);
