import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/global.type";
import GlobalForm from "../components/form/GlobalForm";
import FormInput from "../components/form/FormInput";

const Login = () => {
  const [Login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("user log in processing..");
    try {
      const response = await Login(data).unwrap();
      const user = verifyToken(response.data.accessToken) as TUser;
      dispatch(setUser({ user, token: response.data.accessToken }));
      toast.success("Successfully logged in!", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Row
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GlobalForm onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="name"
          placeholder="user id"
          labelText="Enter Id:"
        />
        <FormInput
          type="text"
          name="password"
          placeholder="user password"
          labelText="Enter Password:"
        />
        <Button htmlType="submit">Submit</Button>
      </GlobalForm>
    </Row>
  );
};

export default Login;
