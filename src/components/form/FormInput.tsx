import { useFormContext } from "react-hook-form";

const FormInput = ({
  type,
  id,
  placeholder,
}: {
  type: string;
  id: string;
  placeholder: string;
}) => {
  const { register } = useFormContext();

  return (
    <input type={type} id={id} placeholder={placeholder} {...register(id)} />
  );
};

export default FormInput;
