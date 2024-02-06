import { Button, Flex } from "antd";
import FormInput from "../../../components/form/FormInput";
import GlobalForm from "../../../components/form/GlobalForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/Admin/AcademicFaculty.Api";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/AcademicFaculty.type";

const CreateAcademicFaculty = () => {
  const [AddAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing");
    try {
      const res = (await AddAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Faculty created", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Flex vertical justify="center" align="center">
        <h2 style={{ marginBottom: 40 }}>Add a new Academic Faculty</h2>
        <GlobalForm onSubmit={onSubmit}>
          <FormInput
            type="text"
            name="name"
            labelText="Faculty name"
            placeholder="Name"
          />
          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
