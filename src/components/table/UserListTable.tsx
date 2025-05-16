import React from "react";
import { css } from "@emotion/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTableSortStore, type SortField } from "@/stores/tableSortStore";
import FlexBox from "@/styles/components/Flexbox";

interface UserData {
  name: string;
  studentId: string;
  department: string;
  RQ: number;
  LQ: number;
  CQ: number;
  total: number;
}

interface Props {
  data: {
    RQ: Array<{ name: string; score: number }>;
    LQ: Array<{ name: string; score: number }>;
    CQ: Array<{ name: string; score: number }>;
  };
}

const tableStyles = css`
  th {
    font-weight: bold;
    background-color: #f5f5f5;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #e0e0e0;
    }
  }
  td,
  th {
    text-align: center !important;
  }
`;

const UserListTable: React.FC<Props> = ({ data }) => {
  const { sortField, sortOrder, setSortField } = useTableSortStore();

  // 데이터 가공
  const processedData: UserData[] = data.RQ.map((rq, index) => ({
    name: rq.name,
    studentId: "2020XXXXX",
    department: "컴퓨터공학과",
    RQ: rq.score,
    LQ: data.LQ[index].score,
    CQ: data.CQ[index].score,
    total: rq.score + data.LQ[index].score + data.CQ[index].score,
  }));

  // 정렬된 데이터
  const sortedData = [...processedData].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    if (typeof a[sortField] === "string") {
      return (
        multiplier *
        (a[sortField] as string).localeCompare(b[sortField] as string)
      );
    }
    return multiplier * ((a[sortField] as number) - (b[sortField] as number));
  });

  const handleSort = (field: SortField) => {
    setSortField(field);
  };

  const SortIcon = () =>
    sortOrder === "asc" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );

  const HeaderCell: React.FC<{ field: SortField; label: string }> = ({
    field,
    label,
  }) => (
    <TableCell onClick={() => handleSort(field)}>
      <FlexBox>
        {label}
        {sortField === field && <SortIcon />}
      </FlexBox>
    </TableCell>
  );

  return (
    <TableContainer component={Paper}>
      <Table css={tableStyles}>
        <TableHead>
          <TableRow>
            <HeaderCell field="name" label="이름" />
            <HeaderCell field="studentId" label="학번" />
            <HeaderCell field="department" label="학과" />
            <HeaderCell field="RQ" label="RQ" />
            <HeaderCell field="LQ" label="LQ" />
            <HeaderCell field="CQ" label="CQ" />
            <HeaderCell field="total" label="Total" />
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((user) => (
            <TableRow key={user.name}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.studentId}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.RQ}</TableCell>
              <TableCell>{user.LQ}</TableCell>
              <TableCell>{user.CQ}</TableCell>
              <TableCell>{user.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
