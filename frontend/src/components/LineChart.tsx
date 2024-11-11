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
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
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

// import React, { useEffect } from "react";
// import ApexCharts, { ApexOptions } from "apexcharts";

// const options: ApexOptions = {
//   series: [
//     {
//       name: "Developer Edition",
//       data: [1500, 1418, 1456, 1526, 1356, 1256],
//       color: "#1A56DB",
//     },
//     {
//       name: "Designer Edition",
//       data: [643, 413, 765, 412, 1423, 1731],
//       color: "#7E3BF2",
//     },
//   ],
//   chart: {
//     height: "100%",
//     // maxWidth: "100%",
//     type: "area",
//     fontFamily: "Inter, sans-serif",
//     dropShadow: {
//       enabled: false,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   tooltip: {
//     enabled: true,
//     x: {
//       show: false,
//     },
//   },
//   legend: {
//     show: false,
//   },
//   fill: {
//     type: "gradient",
//     gradient: {
//       opacityFrom: 0.55,
//       opacityTo: 0,
//       shade: "#1C64F2",
//       gradientToColors: ["#1C64F2"],
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     width: 6,
//   },
//   grid: {
//     show: false,
//     strokeDashArray: 4,
//     padding: {
//       left: 2,
//       right: 2,
//       top: 0,
//     },
//   },
//   xaxis: {
//     categories: [
//       "01 February",
//       "02 February",
//       "03 February",
//       "04 February",
//       "05 February",
//       "06 February",
//       "07 February",
//     ],
//     labels: {
//       show: false,
//     },
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//   },
//   yaxis: {
//     show: false,
//     labels: {
//       formatter: function (value: number) {
//         return "$" + value;
//       },
//     },
//   },
// };

// const LineChart: React.FC = () => {
//   useEffect(() => {
//     if (
//       document.getElementById("data-series-chart") &&
//       typeof ApexCharts !== "undefined"
//     ) {
//       const chart = new ApexCharts(
//         document.getElementById("data-series-chart") as HTMLElement,
//         options
//       );
//       chart.render();
//     }
//   }, []);

//   return <div id="data-series-chart" />;
// };

// export default LineChart;
