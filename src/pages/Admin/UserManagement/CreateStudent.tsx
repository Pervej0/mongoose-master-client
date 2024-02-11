import { Button, Col, Divider, Form, Input, Row } from "antd";
import GlobalForm from "../../../components/form/GlobalForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/Admin/AcademicSemester.Api";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/Admin/AcademicDepartment.Api";
import { useAddStudentMutation } from "../../../redux/features/Admin/Student.api";
import {
  GenderOptions,
  bloodGroupOptions,
} from "../../../components/Constants/Global";
import FormDatePicker from "../../../components/form/FormDatePicker";
import { toast } from "sonner";
import { TResponse, TStudentData } from "../../../types";

const studentDefaultValues = {
  name: {
    firstName: "Md",
    middleName: "Solman",
    lastName: "Khan",
  },
  gender: "male",
  bloogGroup: "A+",
  contactNo: "1235678",
  emergencyContact: "987-654-3210",
  presentAdd: "123 Main St, Cityville",
  permanentAdd: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContact: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContact: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  admissionSemester: "65bbcb9c0e9dfe41e36c4623",
  academicDepartment: "65c2453a8cdf370b53cd6d65",
};

const CreateStudent = () => {
  const { data: sData, isLoading: sIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const [AddStudent] = useAddStudentMutation();

  const semesterOptions = sData?.data?.map((item: any) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Student creating...");
    const studentData = new FormData();
    const mainData = {
      password: "12345",
      student: data,
    };
    studentData.append("data", JSON.stringify(mainData));
    studentData.append("file", data.studentProfile);
    console.log(data, "eee");
    try {
      const res = (await AddStudent(studentData)) as TResponse<TStudentData>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Student created Successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Add A New Student</h1>
      <GlobalForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
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
              name="bloogGroup"
              label="Blood group"
            />
          </Col>
          <Col>
            <Controller
              name="studentProfile"
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
              name="emergencyContact"
              labelText="Emergency Contact"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="presentAdd"
              labelText="Present Address"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="permanentAdd"
              labelText="Permanent Address"
            />
          </Col>
        </Row>
        <Divider>Guardian</Divider>
        <Row>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput type="text" name="guardian." labelText="Father Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="guardian.fatherOccupation"
              labelText="Father Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="guardian.fatherContactNo"
              labelText="ContactNo"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="guardian.motherName"
              labelText="Mother Name"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="guardian.motherOccupation"
              labelText="Mother Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="guardian.motherContactNo"
              labelText="Mother ContactNo"
            />
          </Col>
        </Row>
        <Divider>Local Guardian</Divider>
        <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput type="text" name="localGuardian.name" labelText="Name" />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="localGuardian.occupation"
              labelText="Occupation"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="localGuardian.contactNo"
              labelText="Contact No."
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormInput
              type="text"
              name="localGuardian.address"
              labelText="Address"
            />
          </Col>
        </Row>
        <Divider>Academic Info.</Divider>
        <Row gutter={8}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormSelect
              options={semesterOptions}
              disabled={sIsLoading}
              name="admissionSemester"
              label="Admission Semester"
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FormSelect
              options={departmentOptions}
              disabled={dIsLoading}
              name="academicDepartment"
              label="Admission Department"
            />
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </GlobalForm>
    </div>
  );
};

export default CreateStudent;
