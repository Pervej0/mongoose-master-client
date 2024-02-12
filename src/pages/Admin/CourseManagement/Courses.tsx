import { Button, Modal, Pagination, Table } from "antd";
import {
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "../../../redux/features/Admin/CourseManagement.Api";
import { useState } from "react";
import FormSelect from "../../../components/form/FormSelect";
import GlobalForm from "../../../components/form/GlobalForm";
import { useGetAllFacultyQuery } from "../../../redux/features/Admin/Faculty.api";
import { TAssignFaculty, TResponse } from "../../../types";
import { toast } from "sonner";

const Courses = () => {
  const [page, setPage] = useState(1);
  const { data: courses, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
    { name: "sort", value: "id" },
  ]);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <AssignFaculty courseInfo={item} />;
      },
      width: "1%",
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        // onChange={onChange}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={courses?.meta?.total}
        pageSize={2}
      />
    </>
  );
};

const AssignFaculty = ({ courseInfo }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { data: facultiesData } = useGetAllFacultyQuery(undefined);
  const [UpdateCourse] = useUpdateCourseMutation();
  const facultiesDataOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleCancel = () => setShowModal(false);

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Processing...");
    const facultyData = {
      courseId: courseInfo.key,
      data,
    };
    try {
      const res = (await UpdateCourse(
        facultyData
      )) as TResponse<TAssignFaculty>;
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
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={showModal}
        onCancel={handleCancel}
        footer={null}
      >
        <GlobalForm onSubmit={handleSubmit}>
          <FormSelect
            mode="multiple"
            options={facultiesDataOptions}
            name="faculties"
            label="Select Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </GlobalForm>
      </Modal>
    </>
  );
};

export default Courses;
