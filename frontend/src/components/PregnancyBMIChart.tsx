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
  weight: string;
}

const PregnancyBMIChart = ({ motherId }: { motherId: string }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [weightGainData, setWeightGainData] = useState<
    Array<{ poa: number; gain: number }>
  >([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}appointments/mother/${motherId}`
        );
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();

        console.log("Appointments:", data);

        // Sort appointments by POA weeks
        const sortedAppointments = data.sort(
          (a: Appointment, b: Appointment) => a.POA_weeks - b.POA_weeks
        );
        setAppointments(sortedAppointments);

        // Calculate weight gains
        if (sortedAppointments.length > 0) {
          const initialWeight = parseFloat(sortedAppointments[0].weight);
          console.log("Initial weight:", initialWeight);
          const gains = sortedAppointments.map((app: Appointment) => ({
            poa: app.POA_weeks,
            gain: parseFloat(app.weight) - initialWeight,
          }));
          setWeightGainData(gains);
          console.log("Weight gains:", gains);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [motherId]);

  // Generate POA weeks array (0 to 42)
  const weeks = Array.from({ length: 43 }, (_, i) => i);

  console.log("app ", appointments);
  // Create patient data array that matches the weeks array length
  const patientData = weeks.map((week) => {
    const matchingGain = weightGainData.find((data) => data.poa === week);
    return matchingGain ? matchingGain.gain : null;
  });

  // Chart data
  const data = {
    labels: weeks,
    datasets: [
      {
        label: "Underweight BMI <18.5",
        data: weeks.map((week) => week * (18 / 42)),
        borderColor: "rgba(255, 159, 64, 0.8)",
        backgroundColor: "rgba(255, 159, 64, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Normal BMI 18.5-24.9",
        data: weeks.map((week) => week * (16 / 42)),
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Overweight BMI 25-29.9",
        data: weeks.map((week) => week * (13 / 42)),
        borderColor: "rgba(153, 102, 255, 0.8)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Obese BMI ≥30",
        data: weeks.map((week) => week * (10 / 42)),
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Patient's Weight Gain",
        data: patientData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.4,
        spanGaps: true, // This will connect points even with null values in between
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
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default PregnancyBMIChart;
