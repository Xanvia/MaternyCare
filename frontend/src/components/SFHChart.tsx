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

const SFHChart = () => {
  // Generate weeks array (13 to 40 weeks, as SFH typically starts being measured at 13 weeks)
  const weeks = Array.from({ length: 28 }, (_, i) => i + 13);

  // Chart data
  const data = {
    labels: weeks,
    datasets: [
      {
        label: "90th Percentile",
        data: weeks.map((week) => {
          // 90th percentile calculation (approximate values)
          return week - 4 + 3; // Higher bound
        }),
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        fill: "+1",
        tension: 0.4,
      },
      {
        label: "50th Percentile (Mean)",
        data: weeks.map((week) => {
          // Mean SFH typically corresponds roughly to gestational age in cm
          return week - 4; // Approximate normal value
        }),
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        fill: "+1",
        tension: 0.4,
      },
      {
        label: "10th Percentile",
        data: weeks.map((week) => {
          // 10th percentile calculation (approximate values)
          return week - 4 - 3; // Lower bound
        }),
        borderColor: "rgba(153, 102, 255, 0.8)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Patient's SFH",
        data: weeks.map((week) => {
          // Sample patient data - replace with actual measurements
          return week - 4 + (Math.random() * 2 - 1); // Random variation around normal
        }),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "transparent",
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
        text: "Symphysis-Fundal Height Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks of Pregnancy (POA)",
        },
        min: 13,
        max: 40,
      },
      y: {
        title: {
          display: true,
          text: "Fundal Height (cm)",
        },
        min: 10,
        max: 40,
      },
    },
  };

  return (
    // <Card className="w-full max-w-2xl p-4">
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
    // </Card>
  );
};

export default SFHChart;
