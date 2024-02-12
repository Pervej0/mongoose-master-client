import { useState } from "react";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/Admin/CourseManagement.Api";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/Admin/AcademicFaculty.Api";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/Admin/AcademicDepartment.Api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { Button, Col, Flex } from "antd";
import GlobalForm from "../../../components/form/GlobalForm";
import FormSelect from "../../../components/form/FormSelect";
import FormInput from "../../../components/form/FormInput";
import FormDatePicker from "../../../components/form/FormDatePicker";
import FormSelectWithWatch from "../../../components/form/FormSelectWithWatch";
import { weekDaysOptions } from "../../../components/Constants/Global";
import FormTimePicker from "../../../components/form/FormTimePicker";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));
  console.log(facultiesData, "xxxxx");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing..");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    try {
      const res = (await addOfferedCourse(offeredCourseData)) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Registered Successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
    // console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <GlobalForm onSubmit={onSubmit}>
          <FormSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <FormSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <FormSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <FormSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <FormSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <FormInput type="number" name="section" labelText="Section" />
          <FormInput type="text" name="maxCapacity" labelText="Max Capacity" />
          <FormSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <FormTimePicker name="startTime" label="Start Time" />
          <FormTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
