import React, { useState } from "react";
import { css } from "@emotion/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
interface User {
  id: number;
  name: string;
  studentId: string;
  department: string;
  lq: number;
  rq: number;
  cq: number;
  totalScore: number;
}

interface SelectedUsersTableProps {
  users: User[];
  onUserRemove: (userId: number) => void;
}

type SortField = "name" | "lq" | "rq" | "cq" | "total";
type SortDirection = "asc" | "desc";

const tableContainerStyle = css`
  max-height: 80vh;
  overflow-y: auto;
`;

const tableStyle = css`
  width: 100%;
`;

const tableHeaderStyle = css`
  background-color: #f5f5f5;
  font-weight: bold;
`;

const tableRowStyle = css`
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const tableCellStyle = css`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const nameCellStyle = css`
  ${tableCellStyle}
  font-weight: 500;
`;

const scoreCellStyle = css`
  ${tableCellStyle}
  text-align: center;
  font-weight: 600;
`;

const deleteButtonStyle = css`
  color: #d32f2f;
  transition: color 0.2s ease;

  &:hover {
    color: #b71c1c;
    background-color: rgba(211, 47, 47, 0.1);
  }
`;

const SelectedUsersTable: React.FC<SelectedUsersTableProps> = ({
  users,
  onUserRemove,
}) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 정렬된 사용자 목록 생성
  const sortedUsers = [...users].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case "name":
        aValue = `${a.name} ${a.studentId}`;
        bValue = `${b.name} ${b.studentId}`;
        break;
      case "lq":
        aValue = a.lq;
        bValue = b.lq;
        break;
      case "rq":
        aValue = a.rq;
        bValue = b.rq;
        break;
      case "cq":
        aValue = a.cq;
        bValue = b.cq;
        break;
      case "total":
        aValue = a.totalScore;
        bValue = b.totalScore;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // 페이지네이션된 사용자 목록
  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 정렬 핸들러
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // 페이지네이션 핸들러
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (users.length === 0) {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #666;
          font-style: italic;
        `}
      >
        선택된 학생이 없습니다
      </div>
    );
  }

  return (
    <Paper css={tableContainerStyle}>
      <TableContainer>
        <Table css={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell css={tableHeaderStyle}>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortField === "name" ? sortDirection : "asc"}
                  onClick={() => handleSort("name")}
                >
                  이름
                </TableSortLabel>
              </TableCell>
              <TableCell css={tableHeaderStyle} align="center">
                <TableSortLabel
                  active={sortField === "lq"}
                  direction={sortField === "lq" ? sortDirection : "asc"}
                  onClick={() => handleSort("lq")}
                >
                  LQ
                </TableSortLabel>
              </TableCell>
              <TableCell css={tableHeaderStyle} align="center">
                <TableSortLabel
                  active={sortField === "rq"}
                  direction={sortField === "rq" ? sortDirection : "asc"}
                  onClick={() => handleSort("rq")}
                >
                  RQ
                </TableSortLabel>
              </TableCell>
              <TableCell css={tableHeaderStyle} align="center">
                <TableSortLabel
                  active={sortField === "cq"}
                  direction={sortField === "cq" ? sortDirection : "asc"}
                  onClick={() => handleSort("cq")}
                >
                  CQ
                </TableSortLabel>
              </TableCell>
              <TableCell css={tableHeaderStyle} align="center">
                <TableSortLabel
                  active={sortField === "total"}
                  direction={sortField === "total" ? sortDirection : "asc"}
                  onClick={() => handleSort("total")}
                >
                  TOTAL
                </TableSortLabel>
              </TableCell>
              <TableCell css={tableHeaderStyle} align="center">
                삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} css={tableRowStyle}>
                <TableCell css={nameCellStyle}>{user.name}</TableCell>
                <TableCell css={scoreCellStyle}>{user.lq}</TableCell>
                <TableCell css={scoreCellStyle}>{user.rq}</TableCell>
                <TableCell css={scoreCellStyle}>{user.cq}</TableCell>
                <TableCell css={scoreCellStyle}>{user.totalScore}</TableCell>
                <TableCell css={tableCellStyle} align="center">
                  <IconButton
                    css={deleteButtonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUserRemove(user.id);
                    }}
                    size="small"
                    aria-label="삭제"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={sortedUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="페이지당 행 수:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} / ${count !== -1 ? count : `${to}개 이상`}`
        }
      />
    </Paper>
  );
};

export default SelectedUsersTable;
