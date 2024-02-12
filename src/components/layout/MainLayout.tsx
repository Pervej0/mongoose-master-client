import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header
            style={{ padding: 0, textAlign: "right", paddingRight: "30px" }}
          >
            <Button onClick={() => dispatch(logout())}>Log out dfdff</Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
