import React from "react";
import LineChart from "../../components/LineChart/LineChart.jsx";

export default function DisplayResult({ dataPoints }) {
  return (
    <LineChart
      title="AWIT Fitness History"
      XAxisTitle="Generation"
      YAxisTitle="Fitness"
      dataPoints={dataPoints}
    />
  );
}
