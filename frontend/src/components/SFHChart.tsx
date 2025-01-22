import { useEffect, useState } from "react";
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

interface Appointment {
  POA_weeks: number;
  fundal_height: string;
}

const SFHChart = ({ motherId }: { motherId: string }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fundalHeightData, setFundalHeightData] = useState<
    Array<{ poa: number; height: number }>
  >([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
        `${import.meta.env.VITE_API_URL}appointments/mother/${motherId}`
        );
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();

        // Sort appointments by POA weeks
        const sortedAppointments = data.sort(
          (a: Appointment, b: Appointment) => a.POA_weeks - b.POA_weeks
        );
        setAppointments(sortedAppointments);

        // Extract fundal height measurements
        const measurements = sortedAppointments
          .filter(
            (app: Appointment) => app.fundal_height && app.POA_weeks >= 13
          )
          .map((app: Appointment) => ({
            poa: app.POA_weeks,
            height: parseFloat(app.fundal_height),
          }));
        setFundalHeightData(measurements);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [motherId]);

  console.log("sfh app: ", appointments);

  // Generate weeks array (13 to 40 weeks)
  const weeks = Array.from({ length: 28 }, (_, i) => i + 13);

  // Create patient data array that matches the weeks array length
  const patientData = weeks.map((week) => {
    const matchingHeight = fundalHeightData.find((data) => data.poa === week);
    return matchingHeight ? matchingHeight.height : null;
  });

  // Chart data
  const data = {
    labels: weeks,
    datasets: [
      {
        label: "90th Percentile",
        data: weeks.map((week) => week - 4 + 3),
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        fill: "+1",
        tension: 0.4,
      },
      {
        label: "50th Percentile (Mean)",
        data: weeks.map((week) => week - 4),
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        fill: "+1",
        tension: 0.4,
      },
      {
        label: "10th Percentile",
        data: weeks.map((week) => week - 4 - 3),
        borderColor: "rgba(153, 102, 255, 0.8)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Patient's Fundal Height",
        data: patientData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.4,
        spanGaps: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
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
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default SFHChart;
