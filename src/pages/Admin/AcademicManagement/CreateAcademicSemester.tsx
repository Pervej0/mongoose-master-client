import { Button, Col, Flex } from "antd";
import GlobalForm from "../../../components/form/GlobalForm";
import FormSelect from "../../../components/form/FormSelect";
import { semesterOptions } from "../../../components/Constants/Semester";
import {
  startDateOptions,
  yearOptions,
} from "../../../components/Constants/Global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/Admin/AcademicSemester.Api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemesterResponse } from "../../../types/academicSemester.type";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing..");
    const sessionName = semesterOptions[Number(data.name) - 1].label;
    data.code = data.name;
    data.name = sessionName.toLocaleLowerCase();
    data.year = Number(data.year);
    console.log(data, "ere");
    try {
      const res = (await addAcademicSemester(
        data
      )) as TResponse<TAcademicSemesterResponse>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <GlobalForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <FormSelect
            label="Semester Name"
            name="name"
            options={semesterOptions}
          />
          <FormSelect label="Semester Year" name="year" options={yearOptions} />
          <FormSelect
            label="Start Month"
            name="startMonth"
            options={startDateOptions}
          />
          <FormSelect
            label="End Month"
            name="endMonth"
            options={startDateOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
