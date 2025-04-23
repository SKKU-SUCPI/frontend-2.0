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
      name: "강병희",
      studentId: "2020123456",
      department: "소프트웨어" as const,
      grade: 3,
      lq: 20,
      rq: 25,
      cq: 25,
      totalScore: 70,
      tlq: 30,
      tcq: 30,
      trq: 33,
    },
    {
      id: 2,
      name: "신진건",
      studentId: "2019234567",
      department: "지능형소프트" as const,
      grade: 4,
      lq: 22,
      rq: 30,
      cq: 18,
      totalScore: 70,
      tlq: 30,
      tcq: 25,
      trq: 33,
    },
    {
      id: 3,
      name: "강성철",
      studentId: "2021345678",
      department: "글로벌융합" as const,
      grade: 2,
      lq: 24,
      rq: 28,
      cq: 21,
      totalScore: 73,
      tlq: 33,
      tcq: 28,
      trq: 30,
    },
    {
      id: 4,
      name: "김현우",
      studentId: "2020456789",
      department: "소프트웨어" as const,
      grade: 3,
      lq: 23,
      rq: 27,
      cq: 20,
      totalScore: 70,
      tlq: 29,
      tcq: 27,
      trq: 32,
    },
    {
      id: 5,
      name: "박민수",
      studentId: "2022567890",
      department: "지능형소프트" as const,
      grade: 1,
      lq: 21,
      rq: 21,
      cq: 21,
      totalScore: 63,
      tlq: 25,
      tcq: 25,
      trq: 25,
    },
    {
      id: 6,
      name: "이지원",
      studentId: "2021678901",
      department: "소프트웨어" as const,
      grade: 2,
      lq: 25,
      rq: 29,
      cq: 23,
      totalScore: 77,
      tlq: 32,
      tcq: 30,
      trq: 33,
    },
    {
      id: 7,
      name: "최영희",
      studentId: "2019789012",
      department: "글로벌융합" as const,
      grade: 4,
      lq: 28,
      rq: 24,
      cq: 19,
      totalScore: 71,
      tlq: 33,
      tcq: 28,
      trq: 26,
    },
    {
      id: 8,
      name: "정태준",
      studentId: "2020890123",
      department: "지능형소프트" as const,
      grade: 3,
      lq: 19,
      rq: 26,
      cq: 27,
      totalScore: 72,
      tlq: 24,
      tcq: 33,
      trq: 30,
    },
    {
      id: 9,
      name: "송미라",
      studentId: "2021901234",
      department: "소프트웨어" as const,
      grade: 2,
      lq: 26,
      rq: 22,
      cq: 24,
      totalScore: 72,
      tlq: 33,
      tcq: 30,
      trq: 25,
    },
    {
      id: 10,
      name: "황준호",
      studentId: "2022012345",
      department: "글로벌융합" as const,
      grade: 1,
      lq: 24,
      rq: 31,
      cq: 22,
      totalScore: 77,
      tlq: 30,
      tcq: 28,
      trq: 33,
    },
    {
      id: 11,
      name: "김민지",
      studentId: "2020112233",
      department: "소프트웨어" as const,
      grade: 3,
      lq: 27,
      rq: 23,
      cq: 26,
      totalScore: 76,
      tlq: 32,
      tcq: 31,
      trq: 29,
    },
    {
      id: 12,
      name: "이준영",
      studentId: "2019223344",
      department: "지능형소프트" as const,
      grade: 4,
      lq: 23,
      rq: 29,
      cq: 24,
      totalScore: 76,
      tlq: 28,
      tcq: 32,
      trq: 31,
    },
    {
      id: 13,
      name: "박소연",
      studentId: "2021334455",
      department: "글로벌융합" as const,
      grade: 2,
      lq: 29,
      rq: 26,
      cq: 22,
      totalScore: 77,
      tlq: 33,
      tcq: 29,
      trq: 30,
    },
    {
      id: 14,
      name: "최재현",
      studentId: "2020445566",
      department: "소프트웨어" as const,
      grade: 3,
      lq: 22,
      rq: 28,
      cq: 25,
      totalScore: 75,
      tlq: 27,
      tcq: 30,
      trq: 32,
    },
    {
      id: 15,
      name: "정다은",
      studentId: "2022556677",
      department: "지능형소프트" as const,
      grade: 1,
      lq: 26,
      rq: 24,
      cq: 23,
      totalScore: 73,
      tlq: 31,
      tcq: 29,
      trq: 28,
    },
    {
      id: 16,
      name: "김태호",
      studentId: "2021667788",
      department: "소프트웨어" as const,
      grade: 2,
      lq: 24,
      rq: 27,
      cq: 28,
      totalScore: 79,
      tlq: 29,
      tcq: 32,
      trq: 31,
    },
    {
      id: 17,
      name: "이수진",
      studentId: "2019778899",
      department: "글로벌융합" as const,
      grade: 4,
      lq: 30,
      rq: 25,
      cq: 26,
      totalScore: 81,
      tlq: 33,
      tcq: 30,
      trq: 29,
    },
    {
      id: 18,
      name: "박준서",
      studentId: "2020889900",
      department: "지능형소프트" as const,
      grade: 3,
      lq: 25,
      rq: 30,
      cq: 24,
      totalScore: 79,
      tlq: 30,
      tcq: 33,
      trq: 32,
    },
    {
      id: 19,
      name: "최유진",
      studentId: "2021990011",
      department: "소프트웨어" as const,
      grade: 2,
      lq: 28,
      rq: 26,
      cq: 29,
      totalScore: 83,
      tlq: 32,
      tcq: 31,
      trq: 30,
    },
    {
      id: 20,
      name: "정민우",
      studentId: "2022001122",
      department: "글로벌융합" as const,
      grade: 1,
      lq: 27,
      rq: 28,
      cq: 27,
      totalScore: 82,
      tlq: 31,
      tcq: 32,
      trq: 31,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.includes(searchTerm) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(selectedUsers);
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
              onClick={() => toggleUser(user)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.some(
                    (selectedUser) => selectedUser.id === user.id
                  )}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleUser(user);
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
