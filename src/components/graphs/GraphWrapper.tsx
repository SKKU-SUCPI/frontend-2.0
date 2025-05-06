import React, { useRef, useEffect } from "react";
import { css } from "@emotion/react";
import Card from "@/styles/components/Card";
import FlexBox from "@/styles/components/Flexbox";

interface GraphWrapperProps {
  title: string;
  type: "block" | "dropdown";
  options: {
    labels: string[];
    datasets: Record<string, React.ReactNode>;
  };
}

const titleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
`;

const toggleContainerStyle = css`
  display: flex;
  gap: 10px;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 8px;
`;

const toggleButtonStyle = (isActive: boolean) => css`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${isActive ? "white" : "transparent"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${isActive ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
`;

const dropdownContainerStyle = css`
  position: relative;
  display: inline-block;
`;

const dropdownButtonStyle = css`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 150px;
  justify-content: space-between;

  &:hover {
    background: #f5f5f5;
  }
`;

const dropdownContentStyle = css`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 1;
  margin-top: 4px;
`;

const dropdownItemStyle = css`
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const chartCardStyle = css`
  padding: 24px;
`;

const GraphWrapper: React.FC<GraphWrapperProps> = ({
  title,
  type,
  options,
}) => {
  const [selectedLabel, setSelectedLabel] = React.useState(options.labels[0]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (label: string) => {
    setSelectedLabel(label);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <FlexBox justify="space-between" align="center">
        <h2 css={titleStyle}>{title}</h2>
        {type === "block" ? (
          <div css={toggleContainerStyle}>
            {options.labels.map((label) => (
              <button
                key={label}
                onClick={() => setSelectedLabel(label)}
                css={toggleButtonStyle(selectedLabel === label)}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <div css={dropdownContainerStyle} ref={dropdownRef}>
            <button onClick={handleDropdownToggle} css={dropdownButtonStyle}>
              {selectedLabel}
              <span>▼</span>
            </button>
            {isDropdownOpen && (
              <div css={dropdownContentStyle}>
                {options.labels.map((label) => (
                  <div
                    key={label}
                    onClick={() => handleSelect(label)}
                    css={dropdownItemStyle}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </FlexBox>
      <Card css={chartCardStyle}>{options.datasets[selectedLabel]}</Card>
    </div>
  );
};

export default GraphWrapper;
