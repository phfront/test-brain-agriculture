import React from "react";
import {
  PieChart as Chart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PieChartItem } from "../../types/chart.type";

const RADIAN = Math.PI / 180;
const COLORS = [
  "#32CD32",
  "#4682B4",
  "#FF6347",
  "#8A2BE2",
  "#1E90FF",
  "#FF7F50",
  "#FF1493",
  "#FFD700",
  "#7B68EE",
  "#48D1CC",
  "#20B2AA",
  "#FF4500",
  "#D2691E",
  "#ADFF2F",
  "#FF69B4",
  "#6A5ACD",
  "#DB7093",
  "#40E0D0",
  "#FF8C00",
  "#9932CC",
  "#B22222",
  "#DAA520",
  "#00FA9A",
  "#FFB6C1",
  "#DC143C",
  "#8B4513",
  "#6B8E23",
];

interface PieChartProps {
  data: PieChartItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="w-full grow">
      <ResponsiveContainer>
        <Chart>
          <Legend />
          <Pie
            data={data}
            dataKey="value"
            nameKey="text"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="black"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            labelLine={false}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="outline-none"
              />
            ))}
          </Pie>
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
