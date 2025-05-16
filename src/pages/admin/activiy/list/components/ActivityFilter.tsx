/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Badge from "./Badge";
import { useFilterStore } from "../../../../../stores/filterStore";

const filterContainer = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
`;

const filterSection = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const sectionTitle = css`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const badgeContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const dateInput = css`
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
`;

const ActivityFilter = () => {
  const {
    dateRange,
    grade,
    department,
    status,
    setDateRange,
    setGrade,
    setDepartment,
    setStatus,
  } = useFilterStore();

  const gradeOptions = ["1", "2", "3", "4", "5+"];
  const departmentOptions = ["소프트웨어", "글로벌융합", "컴퓨터공학"];
  const statusOptions = ["승인", "대기", "반려"];

  const handleDateChange = (type: "start" | "end", value: string) => {
    setDateRange({
      ...dateRange,
      [type === "start" ? "startDate" : "endDate"]: value
        ? new Date(value)
        : null,
    });
  };

  return (
    <div css={filterContainer}>
      <div css={filterSection}>
        <div css={sectionTitle}>기간</div>
        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <input
            type="date"
            css={dateInput}
            onChange={(e) => handleDateChange("start", e.target.value)}
          />
          <input
            type="date"
            css={dateInput}
            onChange={(e) => handleDateChange("end", e.target.value)}
          />
        </div>
      </div>

      <div css={filterSection}>
        <div css={sectionTitle}>학년</div>
        <div css={badgeContainer}>
          {gradeOptions.map((g) => (
            <Badge
              key={g}
              label={g}
              colors={{
                background: grade.includes(g) ? "#e6f7ff" : "#ffffff",
                font: grade.includes(g) ? "#1890ff" : "#333333",
              }}
              onClick={() => {
                setGrade(
                  grade.includes(g)
                    ? grade.filter((grade) => grade !== g)
                    : [...grade, g]
                );
              }}
            />
          ))}
        </div>
      </div>

      <div css={filterSection}>
        <div css={sectionTitle}>학과</div>
        <div css={badgeContainer}>
          {departmentOptions.map((d) => (
            <Badge
              key={d}
              label={d}
              colors={{
                background: department.includes(d) ? "#e6f7ff" : "#ffffff",
                font: department.includes(d) ? "#1890ff" : "#333333",
              }}
              onClick={() => {
                setDepartment(
                  department.includes(d)
                    ? department.filter((dept) => dept !== d)
                    : [...department, d]
                );
              }}
            />
          ))}
        </div>
      </div>

      <div css={filterSection}>
        <div css={sectionTitle}>상태</div>
        <div css={badgeContainer}>
          {statusOptions.map((s) => (
            <Badge
              key={s}
              label={s}
              colors={{
                background: status.includes(s) ? "#e6f7ff" : "#ffffff",
                font: status.includes(s) ? "#1890ff" : "#333333",
              }}
              onClick={() => {
                setStatus(
                  status.includes(s)
                    ? status.filter((stat) => stat !== s)
                    : [...status, s]
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFilter;
