import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import IndividualStudentCard from "./components/IndividualStudentCard";
import AverageMetrics from "./components/AverageMetrics";
import StudentDistributionModal from "./components/StudentDistributionModal";
import useStudentsList, { Pageable } from "@/hooks/admin/useStudentsList";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTeamSelectedUserStore } from "@/stores/teamSelectedUserStore";
import type { SelectedUser } from "@/stores/teamSelectedUserStore";
import { useTeamStore, type Team } from "@/stores/teamStore";
import postTeam from "@/apis/team/postTeam";
import postTeamMember from "@/apis/team/postTeamMember";
import putTeam from "@/apis/team/putTeam";
import deleteTeam from "@/apis/team/deleteTeam";
import SimpleBarChart from "@/components/graphs/SimpleBarChart";
import HorizontalBarChart from "@/components/graphs/HorizontalBarChart";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectedUsersTable from "@/components/table/SelectedUsersTable";
import type { AdminStudentResponseItem } from "@/apis/admin/getStudentsList";

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const chartSectionStyle = css`
  display: flex;
  gap: 24px;
  width: 100%;
  min-height: 400px;
`;

const chartBoxStyle = css`
  flex: 1;
  min-height: 500px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const bottomRowStyle = css`
  display: flex;
  gap: 24px;
  width: 100%;
`;

const leftBoxStyle = css`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const rightBoxStyle = css`
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
`;

const navigationButtonsStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

const pageIndicatorStyle = css`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const selectedUserTitleStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

const titleRowStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const hintTextStyle = css`
  font-size: 0.85rem;
  color: #888;
  font-weight: 400;
  margin-top: 4px;
`;

const resetButtonStyle = css`
  color: #666;
  &:hover {
    color: #333;
  }
`;

const userListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
  }
`;

const teamHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const teamListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const teamCardStyle = css`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.1s ease, border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
    border-color: #b0bec5;
    background-color: #f3f4f6;
    transform: translateY(-1px);
  }
`;

const teamNameStyle = css`
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
`;

const teamMetaStyle = css`
  font-size: 0.85rem;
  color: #6b7280;
`;

const teamMembersNamesStyle = css`
  font-size: 0.8rem;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const selectedTeamCardStyle = css`
  border-color: #4caf50;
  background-color: #ecfdf3;
  box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.4);
`;

const selectedMembersBoxStyle = css`
  margin-top: 8px;
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
`;

const selectedMembersTitleStyle = css`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
`;

const selectedMembersListStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const selectedMemberChipStyle = css`
  padding: 4px 8px;
  border-radius: 999px;
  background-color: #e8f5e9;
  border: 1px solid #a5d6a7;
  font-size: 0.8rem;
  color: #2e7d32;
`;

const noDataStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #999;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  padding: 40px;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const toggleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const toggleLabelStyle = css`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const toggleButtonStyle = css`
  position: relative;
  width: 44px;
  height: 24px;
  background: #e0e0e0;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #d0d0d0;
  }
  
  &.active {
    background: #4CAF50;
  }
`;

const toggleKnobStyle = css`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &.active {
    transform: translateX(20px);
  }
`;

const TeamStatisticLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [chartPage, setChartPage] = useState(0);
  const [rightChartPage, setRightChartPage] = useState(0);
  const [showTScore, setShowTScore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<SelectedUser | null>(null);
  const studentListRef = useRef<HTMLDivElement>(null);
  const { teams, addTeam, removeTeam, updateTeam, fetchProjectTeams } = useTeamStore();
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<AdminStudentResponseItem[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // 팀 목록 불러오기
  useEffect(() => {
    const CURRENT_PROJECT_ID = 1;
    fetchProjectTeams(CURRENT_PROJECT_ID);
  }, [fetchProjectTeams]);

  // 자연스러운 검색 기능
  useEffect(() => {
    const handler = setTimeout(() => {
      setMemberSearch(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const pageSize = 10;

  const {
    selectedUsers,
    addUser,
    removeUser,
    isUserSelected,
    averages,
    clearUsers,
  } = useTeamSelectedUserStore();

  // update soon
  const pageable: Pageable = {
    keyword: memberSearch || null,
    name: null,
    department: null,
    page: currentPage - 1, // API는 0-based pagination을 사용
    size: pageSize,
    sort: "",
  };

  const { data: studentsData, isLoading } = useStudentsList(pageable);

  const totalPages = studentsData?.totalPage || 1;

  // T-점수 안전하게 파싱 (NaN 처리)
  const parseTScore = (value: unknown): number => {
    if (value === "NaN" || value === null || value === undefined) return 0;
    const num =
      typeof value === "string"
        ? parseFloat(value)
        : typeof value === "number"
        ? value
        : Number(value);
    return isNaN(num) ? 0 : num;
  };

  // T-점수 합계 계산
  const calculateTotalTScore = (
    tlq: unknown,
    trq: unknown,
    tcq: unknown
  ): number => {
    return parseTScore(tlq) + parseTScore(trq) + parseTScore(tcq);
  };
  
  type ChartUser = AdminStudentResponseItem | SelectedUser;

  const createBarChartData = (user: ChartUser) => {
    if (showTScore) {
      const totalT = calculateTotalTScore(user.tlq, user.trq, user.tcq);
      return {
        LQ: parseTScore(user.tlq),
        RQ: parseTScore(user.trq),
        CQ: parseTScore(user.tcq),
        "T-합계": totalT,
      };
    }
    return {
      LQ: user.lq || 0,
      RQ: user.rq || 0,
      CQ: user.cq || 0,
    };
  };

  // 평균값으로 Bar Chart 데이터 생성
  const createAverageBarChartData = () => {
    if (showTScore) {
      const avgTotal = averages.averageTLQ + averages.averageTRQ + averages.averageTCQ;
      return {
        LQ: averages.averageTLQ,
        RQ: averages.averageTRQ,
        CQ: averages.averageTCQ,
        "T-합계": avgTotal,
      };
    }
    return {
      LQ: averages.averageLQ,
      RQ: averages.averageRQ,
      CQ: averages.averageCQ,
    };
  };

  // 팀 요약(구성원 평균) 생성
  const createTeamSummary = (team: Team): SelectedUser => {
    const members = team.members;
    const len = members.length || 1;

    const sum = members.reduce(
      (acc, user) => {
        return {
          lq: acc.lq + (user.lq || 0),
          rq: acc.rq + (user.rq || 0),
          cq: acc.cq + (user.cq || 0 ),
          total: acc.total + (user.totalScore || 0),
          tlq: acc.tlq + (user.tlq || 0),
          trq: acc.trq + (user.trq || 0),
          tcq: acc.tcq + (user.tcq || 0),
          ttotal: acc.ttotal + (user.totalTScore || 0),
        };
      },
      {
        lq: 0,
        rq: 0,
        cq: 0,
        total: 0,
        tlq: 0,
        trq: 0,
        tcq: 0,
        ttotal: 0,
      }
    );

    return {
      id: team.id,
      name: team.name,
      department: "팀",
      studentId: "",
      lq: Math.round((sum.lq / len) * 100) / 100,
      rq: Math.round((sum.rq / len) * 100) / 100,
      cq: Math.round((sum.cq / len) * 100) / 100,
      totalScore: Math.round((sum.total / len) * 100) / 100,
      tlq: Math.round((sum.tlq / len) * 100) / 100,
      trq: Math.round((sum.trq / len) * 100) / 100,
      tcq: Math.round((sum.tcq / len) * 100) / 100,
      totalTScore: Math.round((sum.ttotal / len) * 100) / 100,
    };
  };

  const handleSelectTeam = (team: Team) => {
    if (isUserSelected(team.id)) {
      removeUser(team.id);
      return;
    }

    const summary = createTeamSummary(team);
    addUser(summary);
  };

  const handleChartPageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setChartPage((prev) => Math.max(0, prev - 1));
    } else {
      setChartPage((prev) => Math.min(selectedUsers.length, prev + 1));
    }
  };

  const handleRightChartPageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setRightChartPage((prev) => Math.max(0, prev - 1));
    } else {
      setRightChartPage((prev) => Math.min(3, prev + 1));
    }
  };

  const getCurrentChartData = () => {
    if (selectedUsers.length === 0) return null;

    if (chartPage === 0) {
      return {
        data: createAverageBarChartData(),
        title: "선택된 팀 평균",
      };
    } else {
      const user = selectedUsers[chartPage - 1];
      return {
        data: createBarChartData(user),
        title: `${user.name}`,
      };
    }
  };

  const currentChartData = getCurrentChartData();
  const totalChartPages = selectedUsers.length + 1; // 평균 + 개별 항목

  const handleReset = () => {
    clearUsers();
    setChartPage(0);
    setRightChartPage(0);
  };

  // 우측 가로 막대 그래프 데이터 생성
  const createHorizontalBarChartData = () => {
    if (selectedUsers.length === 0) return [];

    // rightChartPage에 따라 정렬 기준 변경 (높은 점수가 위로)
    const sortedUsers = [...selectedUsers].sort((a, b) => {
      if (rightChartPage === 0) {
        // 전체 3Q 총합 기준 정렬
        if (showTScore) {
          const totalA = (a.tlq || 0) + (a.trq || 0) + (a.tcq || 0);
          const totalB = (b.tlq || 0) + (b.trq || 0) + (b.tcq || 0);
          return totalB - totalA;
        } else {
          const totalA = (a.lq || 0) + (a.rq || 0) + (a.cq || 0);
          const totalB = (b.lq || 0) + (b.rq || 0) + (b.cq || 0);
          return totalB - totalA;
        }
      } else if (rightChartPage === 1) {
        // LQ 기준 정렬
        const valueA = showTScore ? (a.tlq || 0) : (a.lq || 0);
        const valueB = showTScore ? (b.tlq || 0) : (b.lq || 0);
        return valueB - valueA;
      } else if (rightChartPage === 2) {
        // RQ 기준 정렬
        const valueA = showTScore ? (a.trq || 0) : (a.rq || 0);
        const valueB = showTScore ? (b.trq || 0) : (b.rq || 0);
        return valueB - valueA;
      } else {
        // CQ 기준 정렬
        const valueA = showTScore ? (a.tcq || 0) : (a.cq || 0);
        const valueB = showTScore ? (b.tcq || 0) : (b.cq || 0);
        return valueB - valueA;
      }
    });

    if (rightChartPage === 0) {
      // 누적 막대 (3Q 전체) - 총합으로 표시
      const data = sortedUsers.map((user) => {
        let totalValue;
        
        if (showTScore) {
          const lq = typeof user.tlq === "number" && !isNaN(user.tlq) ? user.tlq : 0;
          const rq = typeof user.trq === "number" && !isNaN(user.trq) ? user.trq : 0;
          const cq = typeof user.tcq === "number" && !isNaN(user.tcq) ? user.tcq : 0;
          totalValue = lq + rq + cq;
        } else {
          const lq = typeof user.lq === "number" && !isNaN(user.lq) ? user.lq : 0;
          const rq = typeof user.rq === "number" && !isNaN(user.rq) ? user.rq : 0;
          const cq = typeof user.cq === "number" && !isNaN(user.cq) ? user.cq : 0;
          totalValue = lq + rq + cq;
        }
        
        return {
          name: user.name,
          value: totalValue,
        };
      });
      return data;
    } else {
      // 개별 영역 (LQ, RQ, CQ)
      const categories = ["LQ", "RQ", "CQ"] as const;
      const category = categories[rightChartPage - 1];
      
      return sortedUsers.map((user) => {
        let value = 0;
        if (showTScore) {
          if (category === "LQ") value = user.tlq || 0;
          else if (category === "RQ") value = user.trq || 0;
          else if (category === "CQ") value = user.tcq || 0;
        } else {
          if (category === "LQ") value = user.lq || 0;
          else if (category === "RQ") value = user.rq || 0;
          else if (category === "CQ") value = user.cq || 0;
        }
        return {
          name: user.name,
          value: typeof value === "number" && !isNaN(value) ? value : 0,
        };
      });
    }
  };

  const getRightChartTitle = () => {
    if (rightChartPage === 0) return "전체 팀 3Q 분포";
    const categories = ["LQ", "RQ", "CQ"];
    return `전체 팀 ${categories[rightChartPage - 1]} 분포`;
  };

  const horizontalChartData = createHorizontalBarChartData();
  const rightChartTitle = getRightChartTitle();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 전체 목록으로 스크롤
    if (studentListRef.current) {
      studentListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleStudentClick = (user: SelectedUser) => {
    setSelectedStudent(user);
    setModalOpen(true);
  };

  const handleRemoveSelectedTeam = (teamId: number) => {
    removeUser(teamId);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleOpenTeamModal = () => {
    setEditingTeam(null);
    setTeamName("");
    //setTeamMemberIds([]);
    setSelectedTeamMembers([]);
    setTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setTeamModalOpen(false);
    setEditingTeam(null);
    setSelectedTeamMembers([]);
  };

 const toggleTeamMember = (student: AdminStudentResponseItem) => {
  setSelectedTeamMembers((prev) => {
    const isAlreadySelected = prev.some((students) => students.id === student.id);
    if (isAlreadySelected) {
      return prev.filter((students) => students.id !== student.id);
    } else {
      return [...prev, student];
    }
  });
 };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setTeamName(team.name);
    setSelectedTeamMembers(team.members.map((member) => ({
      id: Number(member.id),
      name: member.name,
      studentId: member.studentId || "",
      department: member.department || "",
      lq: member.lq || 0,
      rq: member.rq || 0,
      cq: member.cq || 0,
      totalScore: member.totalScore || 0,
      tlq: member.tlq || 0,
      trq: member.trq || 0,
      tcq: member.tcq || 0,

      grade: 0 
    } as AdminStudentResponseItem)));
    setTeamModalOpen(true);
  };

  const handleDeleteTeam = async (teamId: number) => {
    if(!window.confirm("정말로 이 팀을 삭제하시겠습니까?")) return;

    try {
      await deleteTeam(teamId);

      removeTeam(teamId);

      if (isUserSelected(teamId)) {
        removeUser(teamId);
      }
      if (editingTeam && editingTeam.id === teamId) {
        setEditingTeam(null);
      }
    } catch (error) {
      console.error("팀 삭제 실패:", error);
      alert("팀 삭제 중 서버에 오류가 발생했습니다.");
    }
  };

  const handleRegisterTeam = async () => {
    if (!teamName.trim()) {
      alert("팀명을 입력해 주세요.");
      return;
    }

    const selectedMembers = selectedTeamMembers
      .map((student) => ({
        id: student.id,
        name: student.name,
        department: student.department,
        studentId: student.studentId,
        lq: student.lq || 0,
        rq: student.rq || 0,
        cq: student.cq || 0,
        totalScore: student.totalScore || 0,
        tlq: parseTScore(student.tlq),
        trq: parseTScore(student.trq),
        tcq: parseTScore(student.tcq),
        totalTScore: calculateTotalTScore(
          student.tlq,
          student.trq,
          student.tcq
        ),
        memberRole: "MEMBER" as const,
        joinStatus: 0
      }));

    if (selectedMembers.length === 0) {
      alert("팀에 포함할 학생을 한 명 이상 선택해 주세요.");
      return;
    }

    const CURRENT_PROJECT_ID = 1;

    try{
      if (editingTeam) {
        await putTeam(editingTeam.id, {
          teamName: teamName.trim(),
          members: selectedMembers.map((member) => ({
            userId: member.id,
            memberRole: member.memberRole,
          })),
        });

        const updatedTeam: Team = {
          ...editingTeam,
          name: teamName.trim(),
          members: selectedMembers,
        };

        updateTeam(updatedTeam);

        // 선택된 팀이면 요약 데이터도 갱신
        if (isUserSelected(updatedTeam.id)) {
          const summary = createTeamSummary(updatedTeam);
          removeUser(updatedTeam.id);
          addUser(summary);
        }
      } else {

        const teamResponse = await postTeam({
          projectId: CURRENT_PROJECT_ID,
          teamName: teamName.trim(),
        });

        const newTeamId = teamResponse?.data?.teamId || teamResponse?.data;

        if(!newTeamId) throw new Error("팀 ID를 응답받지 못했습니다.");

        await Promise.all(
          selectedMembers.map((member) => {
            postTeamMember(newTeamId, {
              userId: member.id,
              memberRole: member.memberRole,
            })
          })
        );

        const newTeam: Team = {
          id: newTeamId,
          name: teamName.trim(),
          projectId: CURRENT_PROJECT_ID,
          members: selectedMembers,
        };

        addTeam(newTeam);
      }

      setTeamModalOpen(false);
      setEditingTeam(null);
      setTeamName("");
      setSelectedTeamMembers([]);
    } catch (error) {
      console.error("팀 등록 실패:", error);
      alert("팀 등록 중 서버에 오류가 발생했습니다.");
    }
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <h1 style={{ margin: 0 }}>팀별 통계 비교</h1>
        <div css={toggleContainerStyle}>
          <span css={toggleLabelStyle}>T-점수 보기</span>
          <button
            css={toggleButtonStyle}
            className={showTScore ? "active" : ""}
            onClick={() => setShowTScore(!showTScore)}
            aria-label="T-점수 보기 토글"
          >
            <div css={toggleKnobStyle} className={showTScore ? "active" : ""} />
          </button>
        </div>
      </div>
      <AverageMetrics
        averageLQ={showTScore ? averages.averageTLQ : averages.averageLQ}
        averageRQ={showTScore ? averages.averageTRQ : averages.averageRQ}
        averageCQ={showTScore ? averages.averageTCQ : averages.averageCQ}
        averageTotal={
          showTScore
            ? averages.averageTLQ + averages.averageTRQ + averages.averageTCQ
            : averages.averageTotal
        }
        showTScore={showTScore}
      />

      {/* 그래프 섹션 - 좌우 분할 */}
      <div css={chartSectionStyle}>
        {/* 좌측: 세로 막대 그래프 */}
        {selectedUsers.length === 0 ? (
          <div css={chartBoxStyle}>
            <div css={noDataStyle}>선택된 팀이 없습니다</div>
          </div>
        ) : (
          <div css={chartBoxStyle}>
            <div css={navigationButtonsStyle}>
              <IconButton
                size="small"
                onClick={() => handleChartPageChange("prev")}
                disabled={chartPage === 0}
              >
                <ChevronLeftIcon />
              </IconButton>
              <div css={pageIndicatorStyle}>
                {chartPage + 1}/{totalChartPages}
              </div>
              <IconButton
                size="small"
                onClick={() => handleChartPageChange("next")}
                disabled={chartPage === totalChartPages - 1}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {currentChartData && (
                <SimpleBarChart
                  data={currentChartData.data}
                  title={currentChartData.title}
                  showTScore={showTScore}
                />
              )}
            </div>
          </div>
        )}

        {/* 우측: 가로 막대 그래프 */}
        {selectedUsers.length === 0 ? (
          <div css={chartBoxStyle}>
            <div css={noDataStyle}>선택된 팀이 없습니다</div>
          </div>
        ) : (
          <div css={chartBoxStyle}>
            <div css={navigationButtonsStyle}>
              <IconButton
                size="small"
                onClick={() => handleRightChartPageChange("prev")}
                disabled={rightChartPage === 0}
              >
                <ChevronLeftIcon />
              </IconButton>
              <div css={pageIndicatorStyle}>
                {rightChartPage + 1}/4
              </div>
              <IconButton
                size="small"
                onClick={() => handleRightChartPageChange("next")}
                disabled={rightChartPage === 3}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
              }}
            >
              <HorizontalBarChart
                data={horizontalChartData}
                title={rightChartTitle}
                showStacked={rightChartPage === 0}
                singleCategory={
                  rightChartPage === 1
                    ? "LQ"
                    : rightChartPage === 2
                    ? "RQ"
                    : rightChartPage === 3
                    ? "CQ"
                    : undefined
                }
                showTScore={showTScore}
              />
            </div>
          </div>
        )}
      </div>

      {/* 목록 섹션 - 하단 좌우 배치 */}
      <div css={bottomRowStyle}>
        {/* 전체 팀 목록 - 좌측 */}
        <div css={leftBoxStyle}>
          <div css={teamHeaderStyle}>
            <h2 style={{ margin: 0, fontSize: "1.3rem" }}>전체 팀 목록</h2>
            <Button variant="contained" size="small" onClick={handleOpenTeamModal} sx={{ 
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#45a049",
              },
              borderRadius: "8px", 
              fontWeight: 600 
            }}>
              팀 등록
            </Button>
          </div>

          <div css={teamListStyle}>
            {teams.length === 0 ? (
              <div css={noDataStyle}>등록된 팀이 없습니다.</div>
            ) : (
              teams.map((team) => {
                const summary = team.members.length > 0 ? createTeamSummary(team) : null;
                const namesText = team.members.map((m) => m.name).join(", ");
                const isSelected = isUserSelected(team.id);

                return (
                  <div
                    key={team.id}
                    css={[teamCardStyle, isSelected && selectedTeamCardStyle]}
                    onClick={() => handleSelectTeam(team)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span css={teamNameStyle}>{team.name}</span>
                      <span>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTeam(team);
                          }}
                          aria-label="팀 수정"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTeam(team.id);
                          }}
                          aria-label="팀 삭제"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </div>
                    <span css={teamMetaStyle}>
                      구성원 {team.members.length}명
                    </span>
                    {namesText && (
                      <span css={teamMembersNamesStyle}>{namesText}</span>
                    )}
                    {summary && (
                      <span css={teamMetaStyle}>
                        평균 점수{" "}
                        {showTScore
                          ? `${summary.totalTScore} (T-점수 합계)`
                          : `${summary.totalScore}`}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 선택된 팀 목록 - 우측 */}
        <div css={rightBoxStyle}>
          <div css={selectedUserTitleStyle}>
            <div css={titleContainerStyle}>
              <div css={titleRowStyle}>
                <span>선택된 팀 목록</span>
                {selectedUsers.length > 0 && (
                  <IconButton
                    size="small"
                    onClick={handleReset}
                    css={resetButtonStyle}
                    title="초기화"
                  >
                    <RefreshIcon />
                  </IconButton>
                )}
              </div>
              <span css={hintTextStyle}>
                아래 항목을 클릭하면 팀(구성원)의 점수 정보를 확인할 수 있습니다
              </span>
            </div>
          </div>
          <SelectedUsersTable
            users={selectedUsers}
            onUserRemove={handleRemoveSelectedTeam}
            showTScore={showTScore}
            onUserClick={handleStudentClick}
          />
        </div>
      </div>

      {/* 정규분포 모달 */}
      {selectedStudent && (
        <StudentDistributionModal
          open={modalOpen}
          onClose={handleModalClose}
          studentName={selectedStudent.name}
          studentId={selectedStudent.studentId}
          tlq={selectedStudent.tlq || 0}
          trq={selectedStudent.trq || 0}
          tcq={selectedStudent.tcq || 0}
        />
      )}

      {/* 팀 등록 모달 */}
      <Dialog
        open={teamModalOpen}
        onClose={handleCloseTeamModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>팀 등록</DialogTitle>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
        >
          <TextField
            label="팀 이름"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            margin="normal"
          />
          {/* 현재 선택된 학생 요약 */}
          {selectedTeamMembers.length > 0 && (
            <div css={selectedMembersBoxStyle}>
              <div css={selectedMembersTitleStyle}>
                현재 선택된 학생 (
                {
                  selectedTeamMembers.length
                }
                명)
              </div>
              <div css={selectedMembersListStyle}>
                {selectedTeamMembers
                  .map((student) => (
                    <span key={student.id} css={selectedMemberChipStyle}>
                      {student.name} ({student.studentId})
                    </span>
                  ))}
              </div>
            </div>
          )}
          <div css={userListStyle} ref={studentListRef}>
            <h2>팀 구성원 선택</h2>
            <TextField
              label="학생 검색 (이름/학번/학과)"
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              margin="dense"
            />
            <div style={{ 
              position: 'relative', 
              opacity: isLoading ? 0.6 : 1, // Dim the list while loading
              transition: 'opacity 0.2s ease' // Smooth fade
            }}>
              {(studentsData?.content?.length ?? 0) === 0 ? (
                <div css={noDataStyle}>선택할 수 있는 학생이 없습니다.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                  { (studentsData?.content ?? []).map((student) => {
                    const isSelected = selectedTeamMembers.some((students) => students.id === student.id);
                    return (
                      <IndividualStudentCard
                        key={student.id}
                        name={student.name}
                        studentId={student.studentId}
                        department={student.department}
                        totalScore={
                          showTScore
                            ? calculateTotalTScore(
                                student.tlq,
                                student.trq,
                                student.tcq
                              )
                            : student.totalScore || 0
                        }
                        lq={
                          showTScore
                            ? parseTScore(student.tlq)
                            : student.lq || 0
                        }
                        rq={
                          showTScore
                            ? parseTScore(student.trq)
                            : student.rq || 0
                        }
                        cq={
                          showTScore
                            ? parseTScore(student.tcq)
                            : student.cq || 0
                        }
                        onClick={() => toggleTeamMember(student/*.id*/)}
                        isSelected={isSelected}
                        showTScore={showTScore}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => handlePageChange(value)}
              showFirstButton
              showLastButton
              size="medium"
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#4CAF50",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTeamModal} sx={{color: "#4CAF50"}}>취소</Button>
          <Button variant="contained" onClick={handleRegisterTeam} sx={{ 
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
            borderRadius: "8px", 
            fontWeight: 600 
          }}>
            팀 등록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamStatisticLayout;