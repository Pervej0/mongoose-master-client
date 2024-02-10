import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/Admin/AcademicSemester.Api";
import { TAcademicSemesterResponse } from "../../../types/academicSemester.type";
import { useState } from "react";
import { TQueryParam } from "../../../types/global.type";

type DataType = Pick<
  TAcademicSemesterResponse,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  const { data: semesterData, isFetching } =
    useGetAllAcademicSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }: TAcademicSemesterResponse) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "autumn",
        },
        {
          text: "Summer",
          value: "summer",
        },
        {
          text: "Fall",
          value: "fall",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      width: "25%",
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
      width: "15%",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filterSearch: true,
      width: "25%",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      filterSearch: true,
      width: "25%",
    },
    {
      title: "Action",
      width: "10%",
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

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
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

export default StudentData;
