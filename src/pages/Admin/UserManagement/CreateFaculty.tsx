import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddFacultyMutation } from "../../../redux/features/Admin/Faculty.api";
import { toast } from "sonner";
import { TFaculty, TResponse } from "../../../types";
import GlobalForm from "../../../components/form/GlobalForm";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import FormInput from "../../../components/form/FormInput";
import {
  GenderOptions,
  bloodGroupOptions,
} from "../../../components/Constants/Global";
import FormSelect from "../../../components/form/FormSelect";
import FormDatePicker from "../../../components/form/FormDatePicker";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/Admin/AcademicDepartment.Api";

const facultyDefaultValues = {
  designation: "Professor",
  name: {
    firstName: "Jane",
    middleName: "Lee",
    lastName: "Doe",
  },
  gender: "female",
  email: "jane.doe@example.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+1987654321",
  bloodGroup: "B+",
  presentAddress: "789 Oak St, City, Country",
  permanentAddress: "456 Elm St, City, Country",
  profileImg: "path/to/profile/image.jpg",
  academicDepartment: "65c246b08cdf370b53cd6d75",
  isDeleted: false,
};

const CreateFaculty = () => {
  const { data: departmentsData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const [AddFaculty] = useAddFacultyMutation();

  const departmentOptions = departmentsData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Faculty is creating...");
    const facultyData = new FormData();
    const mainData = {
      password: "12345",
      faculty: data,
    };
    console.log(mainData, "xccc");

    facultyData.append("data", JSON.stringify(mainData));
    facultyData.append("file", data.profileImg);
    try {
      const res = (await AddFaculty(facultyData)) as TResponse<TFaculty>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created Successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Add A New Admin</h1>
      <GlobalForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
        <Divider>Personal Information</Divider>
        <Row gutter={8}>
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
        <Divider>Academic Info.</Divider>
        <Row style={{ marginBottom: 15 }}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormSelect
              options={departmentOptions}
              disabled={dIsLoading}
              name="academicDepartment"
              label="Academic Department"
            />
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </GlobalForm>
    </div>
  );
};

export default CreateFaculty;
