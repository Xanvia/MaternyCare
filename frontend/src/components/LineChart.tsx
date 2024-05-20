import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const options = { responsive: true, maintainAspectRatio: true };
  const data = {
    labels: [
      "Month 01",
      "Month 02",
      "Month 03",
      "Month 04",
      "Month 05",
      "Month 06",
      "Month 07",
      "Month 08",
      "Month 09",
      "Month 10",
      "Month 11",
      "Month 12",
    ],
    datasets: [
      {
        label: "Weight",
        data: [1.1, 2, 2.2, 2.5, 3, 4, 6, 10, 12, 15, 18, 20],
        borderColor: "rgb(75,192,192)",
      },
      {
        label: "Other",
        data: [2.1, 3, 1.2, 2.5, 3, 5.8, 10, 7, 12, 15, 23, 17],
        borderColor: "rgb(249, 184, 208)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
