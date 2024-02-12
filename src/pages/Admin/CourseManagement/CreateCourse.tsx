import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/Admin/CourseManagement.Api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TCourse, TResponse } from "../../../types";
import { Button, Col, Flex } from "antd";
import GlobalForm from "../../../components/form/GlobalForm";
import FormSelect from "../../../components/form/FormSelect";
import FormInput from "../../../components/form/FormInput";

const CreateCourse = () => {
  const [AddCourse] = useAddCourseMutation();
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const PreRequisiteOptions = courseData?.data?.map((item: TCourse) => ({
    label: item.title,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing..");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses.course
        ? data.preRequisiteCourses.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res = (await AddCourse(courseData)) as TResponse<TCourse>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Course Added Successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <GlobalForm onSubmit={onSubmit}>
          <FormInput type="text" name="title" labelText="Title" />
          <FormInput type="text" name="prefix" labelText="Prefix" />
          <FormInput type="text" name="code" labelText="Code" />
          <FormInput type="text" name="credits" labelText="Credits" />
          <FormSelect
            mode="multiple"
            options={PreRequisiteOptions}
            name="preRequisiteCourses"
            label="Pre-requisite Courses"
          />
          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
