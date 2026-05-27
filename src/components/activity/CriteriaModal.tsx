/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Modal from "@/components/overlays/Modal";
import useActivities from "@/hooks/common/useActivities";
// import FlexBox from "@/styles/components/Flexbox";
import { useMemo, useRef, useCallback, useState } from "react";

interface CriteriaModalProps {
  open: boolean;
  onClose: () => void;
}

const tableWrapStyle = css`
  display: grid;
  grid-template-columns: 1fr; /* 단일 컬럼 */
  gap: 16px;
`;

const cardStyle = css`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

const cardHeader = css`
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
`;

const subtitleStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  th,
  td {
    border-top: 1px solid #f0f0f0;
    padding: 10px 12px;
    vertical-align: top;
  }
  td { color: #555; }
`;

const toolbarStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #666;
  font-size: 12px;
`;

const tocWrapStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const tocGroupStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const chipStyle = css`
  display: inline-flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  color: #333;
  background: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover { border-color: #4caf50; color: #2e7d32; }
`;

// ADD THIS NEW STYLE HERE
const activeChipStyle = css`
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
  font-weight: 600;
  &:hover {
    color: white; /* Keep text white even on hover when active */
  }
`;

const lineCellStyle = css`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const badgeStyle = css`
  display: inline-block;
  background: #f5f5f5;
  color: #333;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 12px;
`;

const scorePill = css`
  margin-left: auto;
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
  border-radius: 999px;
  padding: 2px 8px;
  font-weight: 600;
`;

const refreshButtonStyle = css`
  background: #4caf50;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function CriteriaModal({ open, onClose }: CriteriaModalProps) {
  const { grouped, isLoading, isFetching, refetch, dataUpdatedAt } = useActivities();
  
  const [selectedFilter, setSelectedFilter] = useState<{
    type: 'cat' | 'class';
    key: string;
  } | null>(null);

  const handleFilterClick = (type: 'cat' | 'class', key: string) => {
    setSelectedFilter({ type, key });
  };

  

  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleKey = (key: string) => {
    setSelectedKey((prev) => 
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };
  
  const setSectionRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  }, []);
  const scrollTo = useCallback((key: string) => {
    const el = sectionRefs.current[key];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const updatedText = useMemo(() => {
    if (!dataUpdatedAt) return "";
    const d = new Date(dataUpdatedAt);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  }, [dataUpdatedAt]);

  const categoryLabelMap: Record<string, string> = {
    LQ: "LQ 학습 능력 지수",
    RQ: "RQ 연구 능력 지수",
    CQ: "CQ 교류 능력 지수",
  };

  return (
    <Modal isOpen={open} onClose={onClose} titleCss={subtitleStyle} title="평가기준">
      <div css={toolbarStyle}>
        <span>
          {isLoading ? "불러오는 중..." : isFetching ? "업데이트 확인 중..." : updatedText ? `업데이트: ${updatedText}` : null}
        </span>
        <button
          onClick={() => refetch()}
          css={refreshButtonStyle}
        >
          새로고침
        </button>
      </div>

      {/* 목차 */}
      {/*<div css={tocWrapStyle}>
        <div css={tocGroupStyle}>
          <strong>영역별 평가 기준</strong>
          {grouped?.byCategory &&
            Object.keys(grouped.byCategory).map((c) => (
              <button key={`toc-cat-${c}`} css={chipStyle} onClick={() => scrollTo(`cat-${c}`)}>
                {categoryLabelMap[c] ?? c}
              </button>
            ))}
        </div>
        <div css={tocGroupStyle}>
          <strong>활동별 평가 기준</strong>
          {grouped?.byClass &&
            Object.keys(grouped.byClass).map((k) => (
              <button key={`toc-class-${k}`} css={chipStyle} onClick={() => scrollTo(`class-${k}`)}>
                {k}
              </button>
            ))}
        </div>
      </div>*/}
      <div css={tocWrapStyle}>
        <div css={tocGroupStyle}>
          <strong>영역별:</strong>
          {grouped?.byCategory && Object.keys(grouped.byCategory).map((c) => (
            <button 
              key={c} 
              // 1. Highlight chip if it exists in the array
              css={[chipStyle, selectedKey.includes(`cat-${c}`) && activeChipStyle]} 
              // 2. Use the toggleKey function instead of setSelectedKey
              onClick={() => toggleKey(`cat-${c}`)}
            >
              {categoryLabelMap[c] ?? c}
            </button>
          ))}
        </div>
        <div css={tocGroupStyle}>
          <strong>활동별:</strong>
          {grouped?.byClass && Object.keys(grouped.byClass).map((k) => (
            <button 
              key={k} 
              // 1. Highlight chip if it exists in the array
              css={[chipStyle, selectedKey.includes(`class-${k}`) && activeChipStyle]} 
              // 2. Use the toggleKey function instead of setSelectedKey
              onClick={() => toggleKey(`class-${k}`)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div css={tableWrapStyle}>
        {/* 1. Show this message if no chips are selected */}
        {selectedKey.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
            보고 싶은 평가 기준들을 위의 메뉴에서 선택해 주세요.
          </div>
        ) : (
          /* 2. Map through the selectedKeys array to show only chosen tables */
          selectedKey.map((key) => {
            const isCat = key.startsWith("cat-");
            const actualKey = key.replace(isCat ? "cat-" : "class-", "");
            const rows = isCat ? grouped?.byCategory?.[actualKey] : grouped?.byClass?.[actualKey];

            if (!rows) return null;

            return (
              <div key={key} css={cardStyle}>
                <div css={cardHeader}>
                  {isCat ? (categoryLabelMap[actualKey] ?? actualKey) : actualKey}
                </div>
                <table css={tableStyle}>
                  <tbody>
                    {rows.map((r: any) => (
                      <tr key={r.activityId}>
                        <td>
                          <div css={lineCellStyle}>
                            <span css={badgeStyle}>
                              {isCat ? r.activityClass : r.categoryName}
                            </span>
                            <span style={{ fontWeight: 500 }}>{r.activityDetail}</span>
                            <span css={scorePill}>+{r.activityWeight}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>

      {/*
      <div css={tableWrapStyle}>
        {grouped?.byCategory &&
          Object.entries(grouped.byCategory).map(([category, rows]) => (
            <div key={category} css={cardStyle} ref={setSectionRef(`cat-${category}`)}>
              <div css={cardHeader}>{categoryLabelMap[category] ?? `${category} 영역 기준표`}</div>
              <table css={tableStyle}>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.activityId}>
                      <td>
                        <div css={lineCellStyle}>
                          <span css={badgeStyle}>{r.activityClass}</span>
                          <span>{r.activityDetail}</span>
                          <span css={scorePill}>+{r.activityWeight}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>

      <div css={[tableWrapStyle, css`margin-top: 16px;`]}>
        {grouped?.byClass && Object.entries(grouped.byClass).map(([klass, rows]) => (
          <div key={klass} css={cardStyle} ref={setSectionRef(`class-${klass}`)}>
            <div css={cardHeader}>{klass}</div>
            <table css={tableStyle}>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.activityId}>
                    <td>
                      <div css={lineCellStyle}>
                        <span css={badgeStyle}>{r.categoryName}</span>
                        <span>{r.activityDetail}</span>
                        <span css={scorePill}>+{r.activityWeight}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>*/}
    </Modal>
  );
}


