import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const FormSelect = ({ name, label, options }: TFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} style={{ marginBottom: "15px" }}>
          <Select
            {...field}
            style={{ width: "100%", paddingBottom: "0" }}
            options={options}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
      defaultValue=""
    />
  );
};

export default FormSelect;
