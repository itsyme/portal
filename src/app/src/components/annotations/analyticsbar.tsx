import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

export interface AnalyticsBarDataPoint {
  ms: number;
  data: {
    [tag: string]: number;
  };
}

interface AnalyticsBarProps {
  dataPoints: AnalyticsBarDataPoint[];
}

const colors = [
  "pink",
  "peachpuff",
  "lightgoldenrod1",
  "palegreen1",
  "palturquoise1",
  "lightsteelblue2",
  "thistle2",
];

function formatDatapoints(dataPoints: AnalyticsBarDataPoint[]) {
  const labels = Object.keys(dataPoints[0].data);
  const length = dataPoints[dataPoints.length - 1].ms / 1000;
  const ticks = new Array(Math.ceil(length)).fill(null).map((_, i) => i * 1000);
  const tickFormatter = (ms: number) => `${Math.round(ms / 1000)}s`;
  const rechartData = useMemo(
    () => dataPoints.map(({ ms, data }) => ({ ms, ...data })),
    [dataPoints]
  );
  return { labels, ticks, tickFormatter, rechartData };
}

function Plot({ dataPoints }: AnalyticsBarProps) {
  const { labels, ticks, tickFormatter, rechartData } = formatDatapoints(
    dataPoints
  );
  return (
    <LineChart width={1000} height={110} data={rechartData}>
      <XAxis
        dataKey="ms"
        type="number"
        ticks={ticks}
        tickFormatter={tickFormatter}
      />
      <YAxis />
      {labels.map((label, i) => (
        <Line type="monotone" dataKey={label} stroke={colors[i]} key={label} />
      ))}
    </LineChart>
  );
}

export default function AnalyticsBar(
  props: AnalyticsBarProps
): JSX.Element | null {
  if (props.dataPoints.length === 0)
    return <div>Please Wait, Data is Loading!</div>;
  return <Plot {...props} />;
}
