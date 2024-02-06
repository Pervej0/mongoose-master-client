import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TFilter, TQueryParam } from "../../../types";
import { useState } from "react";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/Admin/AcademicDepartment.Api";
import { TAcademicDepartment } from "../../../types/AcademicDepartment.type";

type DataType = Pick<TAcademicDepartment, "name">;

const facultyNames: TFilter[] = [];

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: departmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(params);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty, createdAt }) => {
      const facultyName = academicFaculty.name;
      const formatedDate = new Date(createdAt).toLocaleDateString();
      if (facultyNames.length < departmentData.data!.length) {
        facultyNames.push({ value: facultyName, text: facultyName });
      }
      return {
        key: _id,
        name,
        facultyName,
        createdDate: formatedDate,
      };
    }
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },

    {
      title: "Faculty Name",
      dataIndex: "facultyName",
      filters: facultyNames,
      filterMode: "tree",
      filterSearch: true,
      width: "30%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      filterSearch: true,
      width: "25%",
    },
    {
      title: "Action",
      width: "15%",
      render: () => <Button>Update</Button>,
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
      filters.facultyName?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicDepartment;
