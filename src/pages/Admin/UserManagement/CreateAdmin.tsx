import { Button, Col, Divider, Form, Input, Row } from "antd";
import { useAddAdminMutation } from "../../../redux/features/Admin/Admin.api";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import GlobalForm from "../../../components/form/GlobalForm";
import { toast } from "sonner";
import { TAdmin, TResponse } from "../../../types";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import FormDatePicker from "../../../components/form/FormDatePicker";
import {
  GenderOptions,
  bloodGroupOptions,
} from "../../../components/Constants/Global";

const adminDefaultValues = {
  designation: "Admin",
  name: {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
  },
  gender: "male",
  contactNo: "+1234567890",
  emergencyContactNo: "+1987654321",
  presentAddress: "123 Main St, City, Country",
  permanentAddress: "456 Elm St, City, Country",
  profileImg: "path/to/profile/image.jpg",
  isDeleted: false,
};

const CreateAdmin = () => {
  const [AddAdmin] = useAddAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Admin is creating...");
    const adminData = new FormData();
    const mainData = {
      password: "12345",
      admin: data,
    };
    console.log(mainData, "xccc");
    adminData.append("data", JSON.stringify(mainData));
    adminData.append("file", data.profileImg);
    console.log(Object.fromEntries(adminData), "er");
    try {
      const res = (await AddAdmin(adminData)) as TResponse<TAdmin>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Admin created Successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Add A New Admin</h1>
      <GlobalForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
        <Divider>Personal Information</Divider>
        <Row gutter={8} justify="center">
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="name.firstName"
              labelText="First Name"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="name.middleName"
              labelText="Middle Name"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput type="text" name="name.lastName" labelText="Last Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormSelect options={GenderOptions} name="gender" label="Gender" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormDatePicker name="dateOfBirth" label="Date of birth" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormSelect
              options={bloodGroupOptions}
              name="bloodGroup"
              label="Blood group"
            />
          </Col>
          <Col>
            <Controller
              name="profileImg"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item>
                  <Input
                    {...field}
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                </Form.Item>
              )}
            />
          </Col>
        </Row>
        <Divider>Contact Info.</Divider>
        <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput type="text" name="email" labelText="Email" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput type="text" name="contactNo" labelText="Contact" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="emergencyContactNo"
              labelText="Emergency Contact"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="presentAddress"
              labelText="Present Address"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="permanentAddress"
              labelText="Permanent Address"
            />
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </GlobalForm>
    </div>
  );
};

export default CreateAdmin;
