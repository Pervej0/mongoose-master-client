import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInput = {
  type: string;
  name: string;
  labelText: string;
  placeholder?: string;
};

const FormInput = ({ type, name, labelText, placeholder }: TInput) => {
  // const { control } = useForm();
  return (
    <div style={{ marginBottom: "10px" }}>
      {labelText ? (
        <label style={{ paddingBottom: "5px", display: "inline-block" }}>
          {labelText}
        </label>
      ) : null}
      <Controller
        // control={control}
        name={name}
        render={({ field }) => (
          <Form.Item style={{ width: 300, marginBottom: 10 }}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
