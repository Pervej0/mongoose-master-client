import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TDate = {
  name: string;
  label: string;
};

const FormTimePicker = ({ name, label }: TDate) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              size="large"
              format="HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormTimePicker;
