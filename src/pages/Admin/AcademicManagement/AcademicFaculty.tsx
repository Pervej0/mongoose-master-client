import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/Admin/AcademicFaculty.Api";
import { TAcademicFaculty } from "../../../types/AcademicFaculty.type";
import { useState } from "react";
import { TFilter, TQueryParam } from "../../../types";

type DataType = Pick<TAcademicFaculty, "name">;

const filtersData: TFilter[] = [];
const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultyQuery(params);

  const tableData = facultyData?.data?.map(({ _id, name, createdAt }) => {
    if (filtersData.length < facultyData.data!.length) {
      filtersData.push({ text: name, value: name });
    }
    const formatedDate = new Date(createdAt).toLocaleDateString();

    return { key: _id, name, createdDate: formatedDate };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: filtersData,
      filterMode: "menu",
      filterSearch: true,
      width: "50%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      width: "35%",
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
      filters.name?.forEach((item) =>
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

export default AcademicFaculty;
