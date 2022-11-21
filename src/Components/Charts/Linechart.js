import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Linechart({ ChartData }) {
  return (
    <Line
      datasetIdKey="id"
      data={ChartData}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 12,
            min: 0,
          },
        },
      }}
    />
  );
}

export default Linechart;
