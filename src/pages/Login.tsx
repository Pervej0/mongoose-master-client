import { Button } from "antd";
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

  const onSubmit = async (data: SubmitEvent) => {
    console.log(data);
    // const toastId = toast.loading("user log in processing..");
    // try {
    //   const response = await Login(data).unwrap();
    //   const user = verifyToken(response.data.accessToken) as TUser;
    //   dispatch(setUser({ user, token: response.data.accessToken }));
    //   toast.success("Successfully logged in!", { id: toastId });
    //   navigate(`/${user.role}/dashboard`);
    // } catch {
    //   toast.error("Something went wrong!", { id: toastId });
    // }
  };

  return (
    <GlobalForm onSubmit={onSubmit}>
      <label>Enter Id: </label>
      <FormInput type="text" id="name" placeholder="user id" />
      <br />
      <label>Enter Password: </label>
      <FormInput type="text" id="password" placeholder="user password" />
      <Button htmlType="submit">Submit</Button>
    </GlobalForm>
  );
};

export default Login;
