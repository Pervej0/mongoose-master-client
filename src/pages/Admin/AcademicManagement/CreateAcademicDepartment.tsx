import { Button, Flex } from "antd";
import GlobalForm from "../../../components/form/GlobalForm";
import FormInput from "../../../components/form/FormInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/Admin/AcademicDepartment.Api";
import { toast } from "sonner";
import { TAcademicDepartment } from "../../../types/AcademicDepartment.type";
import { TResponse } from "../../../types";
import FormSelect from "../../../components/form/FormSelect";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/Admin/AcademicFaculty.Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicDepartmentSchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicDepartment = () => {
  const [AddAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: facultyData } = useGetAllAcademicFacultyQuery(null);

  const facultyOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing");
    try {
      const res = (await AddAcademicDepartment(
        data
      )) as TResponse<TAcademicDepartment>;
      console.log(res, "ere");
      if (res?.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Academic department created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Flex vertical justify="center" align="center">
        <h2 style={{ marginBottom: 20 }}>Add Academic Department</h2>
        <GlobalForm
          onSubmit={onsubmit}
          resolver={zodResolver(AcademicDepartmentSchema)}
        >
          <FormInput type="text" name="name" labelText="Academic department" />
          <FormSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={facultyOptions!}
          />
          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Flex>
    </div>
  );
};
export default CreateAcademicDepartment;
