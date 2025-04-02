import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";

interface QuotientChartProps {
  totalData: {
    RQ: { name: string; score: number }[];
    LQ: { name: string; score: number }[];
    CQ: { name: string; score: number }[];
  };
}

const QuotientChart: React.FC<QuotientChartProps> = ({ totalData }) => {
  const data = [
    {
      name: "RQ",
      SW: totalData.RQ[0].score,
      EE: totalData.RQ[1].score,
      CSE: totalData.RQ[2].score,
    },
    {
      name: "LQ",
      SW: totalData.LQ[0].score,
      EE: totalData.LQ[1].score,
      CSE: totalData.LQ[2].score,
    },
    {
      name: "CQ",
      SW: totalData.CQ[0].score,
      EE: totalData.CQ[1].score,
      CSE: totalData.CQ[2].score,
    },
  ];

  return (
    <FlexBox direction="column" gap="20px">
      <BarChart width={1000} height={400} data={data} barSize={50}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 33]} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div
                  css={css`
                    background: white;
                    padding: 10px;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  `}
                >
                  <p
                    css={css`
                      font-weight: bold;
                      margin: 0;
                    `}
                  >
                    {label}
                  </p>
                  {payload.map((entry, index) => (
                    <p
                      key={index}
                      css={css`
                        margin: 0;
                        color: ${entry.color};
                      `}
                    >
                      {entry.name}: {entry.value}점
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey="SW" name="Software" fill="#7B8BA3" />
        <Bar dataKey="EE" name="Electrical Engineering" fill="#9BA6BC" />
        <Bar dataKey="CSE" name="Computer Science" fill="#B8C2D4" />
      </BarChart>
    </FlexBox>
  );
};

export default QuotientChart;
