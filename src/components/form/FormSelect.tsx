import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const FormSelect = ({
  name,
  label,
  options,
  disabled,
  mode,
}: TFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} style={{ marginBottom: "10px" }}>
          <Select
            mode={mode}
            {...field}
            style={{ width: "100%", paddingBottom: "0" }}
            options={options}
            placeholder="Please select"
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
      defaultValue=""
    />
  );
};

export default FormSelect;
