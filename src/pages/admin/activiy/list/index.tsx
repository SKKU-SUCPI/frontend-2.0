import React, { useState } from "react";
import ActivityListItem from "./components/ActivityListItem";
import { css } from "@emotion/react";
import Card from "@/styles/components/Card";
import FlexBox from "@/styles/components/Flexbox";
import ActivityDetail from "../components/ActivityDetail";
import Modal from "@/components/overlays/Modal";
import SideOver from "@/components/overlays/SideOver";
import ActivityFilter from "./components/ActivityFilter";
import styled from "@emotion/styled";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
`;

const descriptionStyle = css`
  font-size: 1.5rem;
  color: #777;
  margin-top: 0;
`;

const filterButtonStyle = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 0;
`;

// 더미 데이터
const data = [
  {
    activity_id: 1,
    category: "RQ" as const,
    activity_class: "학술지 논문게재",
    activity_detail: "(인문사회계) KCI 등재",
    title: "인공지능을 활용한 학습 효율성 연구",
    status: "승인" as const,
    date: "2023-10-15",
    user: {
      name: "김철수",
      department: "소프트웨어학과",
      student_id: "20201234",
    },
  },
  {
    activity_id: 2,
    category: "LQ" as const,
    activity_class: "교육활동",
    activity_detail:
      "교내외의 교육 활동(초/중/고/대멘토링, 동료 티칭 등 학과장 승인건)",
    title: "블록체인 기술 세미나 참여",
    status: "대기" as const,
    date: "2023-10-20",
    user: {
      name: "이영희",
      department: "컴퓨터공학과",
      student_id: "20195678",
    },
  },
  {
    activity_id: 3,
    category: "CQ" as const,
    activity_class: "학생회",
    activity_detail: "임원진",
    title: "학과 홍보 영상 제작 프로젝트",
    status: "반려" as const,
    date: "2023-09-28",
    user: {
      name: "박지민",
      department: "미디어학과",
      student_id: "20187777",
    },
  },
  {
    activity_id: 4,
    category: "RQ" as const,
    activity_class: "공모전/ICPC",
    activity_detail: "(과학기술계) 대상/입상, 참여",
    title: "사용자 경험 개선을 위한 UI/UX 실험",
    status: "승인" as const,
    date: "2023-10-05",
    user: {
      name: "정민준",
      department: "디자인학과",
      student_id: "20212345",
    },
  },
  {
    activity_id: 5,
    category: "LQ" as const,
    activity_class: "교육 성취도",
    activity_detail: "학점 4.0 이상 ~ 4.5 이하",
    title: "데이터 분석 워크숍 참가",
    status: "대기" as const,
    date: "2023-10-22",
    user: {
      name: "최수진",
      department: "통계학과",
      student_id: "20203333",
    },
  },
  {
    activity_id: 6,
    category: "CQ" as const,
    activity_class: "알리미",
    activity_detail: "참여",
    title: "신입생 멘토링 프로그램 진행",
    status: "승인" as const,
    date: "2023-09-15",
    user: {
      name: "강동원",
      department: "소프트웨어학과",
      student_id: "20184444",
    },
  },
  {
    activity_id: 7,
    category: "RQ" as const,
    activity_class: "학술대회 발표",
    activity_detail: "(과학기술계) 학술대회 구두발표",
    title: "IoT 기반 스마트홈 시스템 개발",
    status: "대기" as const,
    date: "2023-10-18",
    user: {
      name: "송지은",
      department: "전자공학과",
      student_id: "20205555",
    },
  },
  {
    activity_id: 8,
    category: "LQ" as const,
    activity_class: "오픈소스 SW활동",
    activity_detail: "커미터로서의 활동(5/4/3) - 운영위 심사",
    title: "클라우드 컴퓨팅 특강 수강",
    status: "승인" as const,
    date: "2023-10-10",
    user: {
      name: "황민석",
      department: "컴퓨터공학과",
      student_id: "20196666",
    },
  },
  {
    activity_id: 9,
    category: "CQ" as const,
    activity_class: "화상강연/세미나 참여",
    activity_detail: "참여",
    title: "학술대회 연구 결과 발표",
    status: "반려" as const,
    date: "2023-09-30",
    user: {
      name: "임서연",
      department: "정보통신학과",
      student_id: "20208888",
    },
  },
  {
    activity_id: 10,
    category: "RQ" as const,
    activity_class: "학술지 논문게재",
    activity_detail: "(과학기술계) JCR 상위 20% 이내 학술지(주저/공저)",
    title: "머신러닝 알고리즘 비교 연구",
    status: "대기" as const,
    date: "2023-10-25",
    user: {
      name: "오준호",
      department: "인공지능학과",
      student_id: "20219999",
    },
  },
  {
    activity_id: 11,
    category: "LQ" as const,
    activity_class: "교육활동",
    activity_detail: "교육조교 활동(학부생 TA)",
    title: "인공지능 윤리에 관한 도서 리뷰",
    status: "승인" as const,
    date: "2023-11-02",
    user: {
      name: "김민지",
      department: "철학과",
      student_id: "20211122",
    },
  },
  {
    activity_id: 12,
    category: "CQ" as const,
    activity_class: "해외봉사",
    activity_detail: "수행",
    title: "지역 아동센터 코딩 교육 봉사",
    status: "승인" as const,
    date: "2023-10-30",
    user: {
      name: "이준영",
      department: "교육학과",
      student_id: "20193344",
    },
  },
  {
    activity_id: 13,
    category: "RQ" as const,
    activity_class: "공모전/ICPC",
    activity_detail: "(인문사회계) 국제/대규모 공모전(ICPC, 공개SW개발자대회)",
    title: "블록체인 기반 학생증 시스템 특허 출원",
    status: "대기" as const,
    date: "2023-11-05",
    user: {
      name: "박서현",
      department: "정보보호학과",
      student_id: "20185566",
    },
  },
  {
    activity_id: 14,
    category: "LQ" as const,
    activity_class: "교육 성취도",
    activity_detail: "학점 3.5 이상 ~ 4.0 미만",
    title: "정보처리기사 자격증 취득",
    status: "승인" as const,
    date: "2023-10-28",
    user: {
      name: "정다은",
      department: "소프트웨어학과",
      student_id: "20207788",
    },
  },
  {
    activity_id: 15,
    category: "CQ" as const,
    activity_class: "스터디그룹",
    activity_detail: "회장",
    title: "프로그래밍 동아리 알고리즘 대회 개최",
    status: "반려" as const,
    date: "2023-11-01",
    user: {
      name: "한지훈",
      department: "컴퓨터공학과",
      student_id: "20182233",
    },
  },
  {
    activity_id: 16,
    category: "RQ" as const,
    activity_class: "학술지 논문게재",
    activity_detail: "(인문사회계) KCI 우수등재 학술지",
    title: "빅데이터 분석을 통한 소비자 행동 연구",
    status: "승인" as const,
    date: "2023-10-12",
    user: {
      name: "최윤서",
      department: "경영학과",
      student_id: "20204455",
    },
  },
  {
    activity_id: 17,
    category: "LQ" as const,
    activity_class: "오픈소스 SW활동",
    activity_detail: "OS커뮤니티 생성 및 활성도(5/4/3) - 운영위 심사",
    title: "AWS 클라우드 자격증 온라인 강의 수강",
    status: "대기" as const,
    date: "2023-11-08",
    user: {
      name: "김태호",
      department: "클라우드컴퓨팅학과",
      student_id: "20216677",
    },
  },
  {
    activity_id: 18,
    category: "CQ" as const,
    activity_class: "학생회",
    activity_detail: "회장",
    title: "학과 MT 기획 및 진행",
    status: "승인" as const,
    date: "2023-09-20",
    user: {
      name: "이수빈",
      department: "소프트웨어학과",
      student_id: "20198899",
    },
  },
  {
    activity_id: 19,
    category: "RQ" as const,
    activity_class: "공모전/ICPC",
    activity_detail: "(과학기술계) 대상/입상, 참여",
    title: "전국 대학생 소프트웨어 경진대회 참가",
    status: "대기" as const,
    date: "2023-11-10",
    user: {
      name: "장민호",
      department: "인공지능학과",
      student_id: "20202211",
    },
  },
  {
    activity_id: 20,
    category: "LQ" as const,
    activity_class: "교육활동",
    activity_detail:
      "교내외의 교육 활동(초/중/고/대멘토링, 동료 티칭 등 학과장 승인건)",
    title: "알고리즘 스터디 그룹 운영",
    status: "승인" as const,
    date: "2023-10-08",
    user: {
      name: "신예진",
      department: "컴퓨터공학과",
      student_id: "20214433",
    },
  },
] as const;

const AdminActivityList: React.FC = () => {
  // zustand로 다 빼버릴지 고민중
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null
  );
  const [isSideOverOpen, setIsSideOverOpen] = useState(false);

  const handleDetailClick = (activity_id: number) => {
    setSelectedActivityId(activity_id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedActivityId(null);
  };

  return (
    <div>
      <h1 css={titleStyle}>활동 모아보기</h1>
      <h2 css={descriptionStyle}>
        활동 제출 후 검토 중인 활동을 확인할 수 있습니다.
      </h2>
      <FlexBox justify="space-between">
        <h2 css={subtitleStyle}>활동 내역</h2>
        <button css={filterButtonStyle} onClick={() => setIsSideOverOpen(true)}>
          검색 필터
        </button>
      </FlexBox>

      {/* TODO: 스크롤 넣올지 말지 의논 */}
      <Card>
        <FlexBox direction="column" gap="12px">
          {data.map((item) => (
            <React.Fragment key={item.activity_id}>
              <ActivityListItem {...item} onDetailClick={handleDetailClick} />
              <Divider />
            </React.Fragment>
          ))}
        </FlexBox>
      </Card>

      {/* 필터링 사이드바 */}
      <SideOver
        title="활동 필터링"
        isOpen={isSideOverOpen}
        onClose={() => {
          setIsSideOverOpen(false);
        }}
      >
        <ActivityFilter />
      </SideOver>
      {/* 활동 상세보기 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="활동 상세 보기"
      >
        {selectedActivityId && (
          <ActivityDetail
            activity_id={selectedActivityId}
            view_type="history"
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminActivityList;
