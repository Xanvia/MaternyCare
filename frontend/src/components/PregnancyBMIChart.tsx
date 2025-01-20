// import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { Card } from "@/components/ui/card";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PregnancyBMIChart = () => {
  // Generate POA weeks array (0 to 42)
  const weeks = Array.from({ length: 43 }, (_, i) => i);

  const hardcodedBMIData = [
    0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0,
    7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5,
    14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0, 17.5, 18.0, 17.5, 17.0, 16.5,
    16.0, 15.5,
  ];

  // Chart data
  const data = {
    labels: weeks,
    datasets: [
      {
        label: "Underweight BMI <18.5",
        data: weeks.map((week) => {
          // Calculate values for underweight line
          return week * (18 / 42); // Linear progression to max 18kg
        }),
        borderColor: "rgba(255, 159, 64, 0.8)",
        backgroundColor: "rgba(255, 159, 64, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Normal BMI 18.5-24.9",
        data: weeks.map((week) => {
          // Calculate values for normal weight line
          return week * (16 / 42); // Linear progression to max 16kg
        }),
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Overweight BMI 25-29.9",
        data: weeks.map((week) => {
          // Calculate values for overweight line
          return week * (13 / 42); // Linear progression to max 13kg
        }),
        borderColor: "rgba(153, 102, 255, 0.8)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Obese BMI ≥30",
        data: weeks.map((week) => {
          // Calculate values for obese line
          return week * (10 / 42); // Linear progression to max 10kg
        }),
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Patient's Weight Gain (BMI)",
        data: hardcodedBMIData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const, // Instead of just 'top'
      },
      tooltip: {
        mode: "index" as const, // Instead of just 'index'
        intersect: false,
      },
      title: {
        display: true,
        text: "Pregnancy Weight Gain Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks of Pregnancy (POA)",
        },
        min: 0,
        max: 42,
      },
      y: {
        title: {
          display: true,
          text: "Weight Gain (kg)",
        },
        min: 0,
        max: 18,
      },
    },
  };

  return (
    // <Card className="w-full max-w-2xl p-4">-
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
    // </Card>
  );
};

export default PregnancyBMIChart;
