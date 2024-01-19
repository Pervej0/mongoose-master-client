import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [Login, { data, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  type TUserInfo = {
    id: string;
    password: string;
  };
  const onSubmit = async (data: SubmitEvent) => {
    const response = await Login(data).unwrap();
    const user = verifyToken(response.data.accessToken);
    dispatch(setUser({ user, token: response.data.accessToken }));
  };
  console.log(data, error, "eee");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("id")} />
      <br />
      <label>Enter Password</label>
      <input {...register("password")} />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
