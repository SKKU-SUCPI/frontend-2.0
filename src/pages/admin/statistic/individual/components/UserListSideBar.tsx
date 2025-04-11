import React, { useState } from "react";
import { css } from "@emotion/react";
import { useSelectedUserStore } from "@/stores/selectedUserStore";
import SideOver from "@/components/overlays/SideOver";
import FlexBox from "@/styles/components/Flexbox";

const buttonsContainerStyle = css`
  display: flex;
  gap: 10px;
`;

const clearButtonStyle = css`
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const searchStyle = css`
  width: 90%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  flex: 1;
  text-align: left;
  margin: 0 auto;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: #f5f5f5;
    padding: 12px;
    text-align: left;
    font-weight: 500;
    border-bottom: 2px solid #e0e0e0;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
  }

  tr:hover {
    background-color: #f8f9fa;
  }
`;

const checkboxStyle = css`
  margin-right: 8px;
`;

interface UserListSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserListSideBar: React.FC<UserListSideBarProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedUsers, toggleUser, clearSelectedUsers } =
    useSelectedUserStore();

  // 임시 데이터
  const users = [
    {
      id: 1,
      name: "김민준",
      department: "컴퓨터공학과",
      studentId: "20201234",
      grade: 3,
      lq: 85,
      rq: 78,
      cq: 92,
      totalScore: 255,
      tlq: 90,
      tcq: 88,
      trq: 82,
    },
    {
      id: 2,
      name: "이서연",
      department: "경영학과",
      studentId: "20195678",
      grade: 4,
      lq: 92,
      rq: 88,
      cq: 79,
      totalScore: 259,
      tlq: 94,
      tcq: 76,
      trq: 89,
    },
    {
      id: 3,
      name: "박지훈",
      department: "전자공학과",
      studentId: "20189012",
      grade: 2,
      lq: 76,
      rq: 95,
      cq: 83,
      totalScore: 254,
      tlq: 78,
      tcq: 85,
      trq: 91,
    },
    {
      id: 4,
      name: "최수빈",
      department: "심리학과",
      studentId: "20223456",
      grade: 1,
      lq: 88,
      rq: 72,
      cq: 90,
      totalScore: 250,
      tlq: 85,
      tcq: 92,
      trq: 73,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.includes(searchTerm) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SideOver isOpen={isOpen} onClose={onClose} title="유저 선택">
      <FlexBox
        css={css`
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          height: auto;
        `}
      >
        <input
          type="text"
          placeholder="이름, 학번 또는 학과로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          css={searchStyle}
        />
        <div css={buttonsContainerStyle}>
          <button css={clearButtonStyle} onClick={clearSelectedUsers}>
            전체 해제
          </button>
        </div>
      </FlexBox>

      <table css={tableStyle}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}></th>
            <th style={{ width: "25%" }}>이름</th>
            <th style={{ width: "25%" }}>학번</th>
            <th style={{ width: "40%" }}>학과</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => toggleUser(user.id)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleUser(user.id);
                  }}
                  css={checkboxStyle}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.studentId}</td>
              <td>{user.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SideOver>
  );
};

export default UserListSideBar;
