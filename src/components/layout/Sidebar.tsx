import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { SidebarItemsGenerator } from "../../utils/SidebarItemsGenerator";
import { AdminPaths } from "../../routes/admin.routes";
import { FacultyPaths } from "../../routes/Faculty.routes";
import { StudentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { currentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";

const USER_ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const token = useAppSelector(currentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  let sidebarItems: any;

  switch (user?.role) {
    case USER_ROLE.ADMIN:
      sidebarItems = SidebarItemsGenerator(AdminPaths, USER_ROLE.ADMIN);
      break;
    case USER_ROLE.FACULTY:
      sidebarItems = SidebarItemsGenerator(FacultyPaths, USER_ROLE.FACULTY);
      break;
    case USER_ROLE.STUDENT:
      sidebarItems = SidebarItemsGenerator(StudentPaths, USER_ROLE.STUDENT);
      break;
    default:
      sidebarItems = SidebarItemsGenerator(StudentPaths, USER_ROLE.STUDENT);
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <div>
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Ph Univ
        </h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
