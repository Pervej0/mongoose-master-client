import {
  Button,
  Pagination,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/global.type";
import { useGetAllStudentQuery } from "../../../redux/features/Admin/Student.api";
import { TStudentData } from "../../../types";

type DataType = Pick<TStudentData, "email" | "contactNo" | "fullName">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: "page", value: page },
    { name: "limit", value: 3 },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = studentData?.data?.map(
    ({ fullName, _id, id, email, contactNo }) => ({
      key: _id,
      id,
      email,
      contactNo,
      fullName,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Student ID",
      dataIndex: "id",
      filterSearch: true,
    },
    {
      title: "Action",

      render: () => (
        <Space>
          <Button>Details</Button>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: "1%",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={studentData?.meta?.total}
        pageSize={2}
      />
    </>
  );
};

export default StudentData;
