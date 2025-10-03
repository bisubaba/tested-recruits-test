import React from "react";
import VitalsCard from "./VitalsCard.jsx";
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

export default function DiagnosisHistory({ diagnostic_history }) {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const informations = [
    {
      title: "Respiratory Rate",
      icon: "respi.png",
      value: diagnostic_history[0].respiratory_rate.value,
      levels: diagnostic_history[0].temperature.levels,
      unit: "bpm",
      class: "vitals-card-respi",
    },
    {
      title: "Temperature",
      icon: "Temperature.png",
      value: diagnostic_history[0].temperature.value,
      levels: diagnostic_history[0].temperature.levels,
      unit: "F",
      class: "vitals-card-temperature",
    },
    {
      title: "Heart Rate",
      icon: "heart.png",
      value: diagnostic_history[0].heart_rate.value,
      levels: diagnostic_history[0].heart_rate.levels,
      unit: "bpm",
      class: "vitals-card-heart",
    },
  ];

  return (
    <div className="w-full bg-white p-3 rounded-xl flex flex-col">
      <p className="card-title-24pt">Diagnosis History</p>
      <div className="charts-container h-70 flex flex-col gap-4 m-2.5 p-5.5 pt-5.5 mt-7.5">
        <p className="card-title-24pt">Blood Pressure</p>
        <Line data={data} options={options} />
      </div>

      {/* {diagnostic_history[0] && diagnostic_history[0].map((diagnostic_item) => {
        return ( */}
          <div className="vitals-container grid grid-cols-3 gap-4 p-2 pt-5.5">
            <VitalsCard data={informations[0]} /> 
            <VitalsCard data={informations[1]} />
            <VitalsCard data={informations[2]} />
          </div>
        {/* );
      })} */}
    </div>
  );
}
