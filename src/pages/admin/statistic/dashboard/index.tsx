import React, { useMemo } from "react";
import { css } from "@emotion/react";
import QCard from "./components/QCard";
import FlexBox from "@/styles/components/Flexbox";
import QuotientChart from "@/components/graphs/QuotientChart";
import StackedBarChart from "@/components/graphs/StackedBarChart";
import GraphWrapper from "@/components/graphs/GraphWrapper";
import {
  use3qTotalAverage,
  use3qDepartmentAverage,
} from "@/hooks/admin/use3qAverage";
import {
  transformTotalAverage,
  transformDepartmentAverage,
} from "./utils/transform3qAverage";
import Loading from "@/components/layouts/Loading";
const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
`;

const AdminStatisticDashboard: React.FC = () => {
  /////////////// data fetch ///////////////
  const { data: totalAverage, isLoading: totalAverageLoading } =
    use3qTotalAverage();
  const { data: departmentAverage, isLoading: departmentAverageLoading } =
    use3qDepartmentAverage();

  const totalLoading = totalAverageLoading || departmentAverageLoading;
  const totalData = useMemo(() => {
    return transformTotalAverage(totalAverage);
  }, [totalAverage]);
  const departmentData = useMemo(() => {
    return transformDepartmentAverage(departmentAverage);
  }, [departmentAverage]);

  if (totalLoading) return <Loading />;

  /////////////// component 부분 ///////////////
  return (
    <div>
      <h1 css={titleStyle}>통계 대시보드</h1>

      <div>
        <h2 css={subtitleStyle}>3Q 전체 통계</h2>
        <FlexBox gap="20px">
          {totalData.map((item) => (
            <QCard
              key={item.name}
              name={item.name}
              description={item.description}
              score={item.score}
            />
          ))}
        </FlexBox>
      </div>

      <GraphWrapper
        title="지수별/학과별 비교"
        type="block"
        options={{
          labels: ["영역별 보기", "학과별 보기"],
          datasets: {
            "영역별 보기": <QuotientChart data={departmentData} />,
            "학과별 보기": <StackedBarChart data={departmentData} />,
          },
        }}
      />
    </div>
  );
};

export default AdminStatisticDashboard;
