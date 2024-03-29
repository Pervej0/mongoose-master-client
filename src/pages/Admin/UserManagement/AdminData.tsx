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
import { TAdmin, TStudentData } from "../../../types";
import { useGetAllAdminQuery } from "../../../redux/features/Admin/Admin.api";
import { Link } from "react-router-dom";

type DataType = Pick<TStudentData, "email" | "contactNo" | "fullName">;

const AdminData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isFetching } = useGetAllAdminQuery([
    { name: "page", value: page },
    { name: "limit", value: 3 },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = studentData?.data?.map(
    ({ fullName, _id, id, email, contactNo }: TAdmin) => ({
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
      title: "Admin Id",
      dataIndex: "id",
      filterSearch: true,
    },
    {
      title: "Action",

      render: (value) => (
        <Space>
          <Link to={`/admin/admin-data/${value.key}`}>
            <Button>Details</Button>
          </Link>
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

export default AdminData;
