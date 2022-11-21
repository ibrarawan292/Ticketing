import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ ChartData }) {
  return (
    <Bar
      datasetIdKey="id2"
      data={ChartData}
      options={{
        plugins: {
          font: {
            size: 8,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 11,
            min: 0,
          },
        },
      }}
    />
  );
}

export default BarChart;
