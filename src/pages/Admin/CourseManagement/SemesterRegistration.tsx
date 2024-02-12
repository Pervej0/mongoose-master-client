import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/Admin/CourseManagement.Api";
import { toast } from "sonner";
import {
  TAcademicSemester,
  TRegisteredSemester,
  TResponse,
} from "../../../types";
import { Button, Col, Flex } from "antd";
import GlobalForm from "../../../components/form/GlobalForm";
import FormSelect from "../../../components/form/FormSelect";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/Admin/AcademicSemester.Api";
import { semesterStatusOptions } from "../../../components/Constants/Semester";
import FormDatePicker from "../../../components/form/FormDatePicker";
import FormInput from "../../../components/form/FormInput";

const SemesterRegistration = () => {
  const { data: academicSemester } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();

  const academicSemesterOptions = academicSemester?.data?.map(
    (item: TAcademicSemester) => ({
      label: `${item.name} & ${item.year}`,
      value: item._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing..");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addRegisteredSemester(
        semesterData
      )) as TResponse<TRegisteredSemester>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Registered Successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <GlobalForm onSubmit={onSubmit}>
          <FormSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <FormSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <FormDatePicker name="startDate" label="Start Date" />
          <FormDatePicker name="endDate" label="End Date" />
          <FormInput type="text" name="minCredit" labelText="Min Credit" />
          <FormInput type="text" name="maxCredit" labelText="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
