import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import HeartRate from "../assets/HeartBPM.svg";
import Temperature from "../assets/temperature.svg";
import RespRate from "../assets/respiratory_rate.svg";
import VitalsCard from "./VitalsCard";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LineController
);

export default function DiagnosisHistory({ diagnostic_history }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Process data for Chart.js - show only latest 6 months
  const processBloodPressureData = (data) => {
    if (!data || data.length === 0)
      return { labels: [], systolicData: [], diastolicData: [] };

    // Take only the first 6 items (latest 6 months) and reverse for chronological order
    const latest6Months = data.slice(0, 6).reverse();

    const labels = latest6Months.map((item) => {
      const monthShort = item.month.substring(0, 3);
      return `${monthShort}, ${item.year}`;
    });

    // Handle both direct numbers and objects with .value property
    const systolicData = latest6Months.map((item) => {
      const systolic = item.blood_pressure.systolic;
      return typeof systolic === "object" ? systolic.value || 0 : systolic || 0;
    });

    const diastolicData = latest6Months.map((item) => {
      const diastolic = item.blood_pressure.diastolic;
      return typeof diastolic === "object"
        ? diastolic.value || 0
        : diastolic || 0;
    });

    return { labels, systolicData, diastolicData };
  };

  // Calculate average vital signs for last 6 months
  const calculateVitalSignsAverages = (data) => {
    if (!data || data.length === 0) {
      return {
        respiratoryRate: 0,
        temperature: 0,
        heartRate: 0,
        systolic: 0,
        diastolic: 0,
      };
    }

    // Take only the first 6 items (latest 6 months)
    const latest6Months = data.slice(0, 6);

    let respiratorySum = 0,
      temperatureSum = 0,
      heartRateSum = 0;
    let systolicSum = 0,
      diastolicSum = 0;
    let respiratoryCount = 0,
      temperatureCount = 0,
      heartRateCount = 0;
    let bpCount = 0;

    latest6Months.forEach((item) => {
      // Respiratory Rate
      if (item.respiratory_rate) {
        const respRate =
          typeof item.respiratory_rate === "object"
            ? item.respiratory_rate.value || 0
            : item.respiratory_rate || 0;
        if (respRate > 0) {
          respiratorySum += respRate;
          respiratoryCount++;
        }
      }

      // Temperature
      if (item.temperature) {
        const temp =
          typeof item.temperature === "object"
            ? item.temperature.value || 0
            : item.temperature || 0;
        if (temp > 0) {
          temperatureSum += temp;
          temperatureCount++;
        }
      }

      // Heart Rate
      if (item.heart_rate) {
        const hr =
          typeof item.heart_rate === "object"
            ? item.heart_rate.value || 0
            : item.heart_rate || 0;
        if (hr > 0) {
          heartRateSum += hr;
          heartRateCount++;
        }
      }
    });

    return {
      respiratoryRate:
        respiratoryCount > 0
          ? Math.round(respiratorySum / respiratoryCount)
          : 0,
      temperature:
        temperatureCount > 0
          ? Math.round((temperatureSum / temperatureCount) * 10) / 10
          : 0,
      heartRate:
        heartRateCount > 0 ? Math.round(heartRateSum / heartRateCount) : 0,
    };
  };

  // Get latest values for legend
  const getLatestValues = () => {
    if (!diagnostic_history || diagnostic_history.length === 0)
      return { systolic: 0, diastolic: 0 };

    const latestItem = diagnostic_history[0];
    if (!latestItem || !latestItem.blood_pressure)
      return { systolic: 0, diastolic: 0 };

    // Extract numeric values, handling both direct numbers and objects with .value property
    const systolic =
      typeof latestItem.blood_pressure.systolic === "object"
        ? latestItem.blood_pressure.systolic.value || 0
        : latestItem.blood_pressure.systolic || 0;

    const diastolic =
      typeof latestItem.blood_pressure.diastolic === "object"
        ? latestItem.blood_pressure.diastolic.value || 0
        : latestItem.blood_pressure.diastolic || 0;

    return { systolic, diastolic };
  };

  const latestValues = getLatestValues();
  const averages = calculateVitalSignsAverages(diagnostic_history);
  const { labels } = processBloodPressureData(diagnostic_history);

  // Determine level status based on normal ranges
  const getVitalSignLevel = (type, value) => {
    const ranges = {
      respiratoryRate: { low: 12, high: 20, unit: "breaths/min" },
      temperature: { low: 97.0, high: 99.5, unit: "°F" },
      heartRate: { low: 60, high: 100, unit: "bpm" },
    };

    const range = ranges[type];
    if (!range || value === 0) return { status: "unknown", color: "gray" };

    if (value < range.low) return "Low";
    if (value > range.high) return "High";
    return "Normal";
  };

  const vitalSignsData = [
    {
      icon: RespRate,
      title: "Respiratory Rate",
      value: averages.respiratoryRate,
      unit: "bpm",
      class: "vitals-card-respi",
      level: getVitalSignLevel("respiratoryRate", averages.respiratoryRate),
    },
    {
      icon: Temperature,
      title: "Temperature",
      value: averages.temperature,
      unit: "°F",
      class: "vitals-card-temperature",
      level: getVitalSignLevel("temperature", averages.temperature),
    },
    {
      icon: HeartRate,
      title: "Heart Rate",
      value: averages.heartRate,
      unit: "bpm",
      class: "vitals-card-heart",
      level: getVitalSignLevel("heartRate", averages.heartRate),
    },
  ];

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx || !diagnostic_history) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const { labels, systolicData, diastolicData } =
      processBloodPressureData(diagnostic_history);

    // Only create chart if we have data
    if (labels.length === 0) return;

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Systolic",
            data: systolicData,
            borderColor: "#e879dc",
            backgroundColor: "#e879dc",
            pointBackgroundColor: "#e879dc",
            pointBorderColor: "#e879dc",
            pointRadius: 8,
            pointHoverRadius: 10,
            borderWidth: 3,
            fill: false,
            tension: 0.4,
          },
          {
            label: "Diastolic",
            data: diastolicData,
            borderColor: "#8b7ce8",
            backgroundColor: "#8b7ce8",
            pointBackgroundColor: "#8b7ce8",
            pointBorderColor: "#8b7ce8",
            pointRadius: 8,
            pointHoverRadius: 10,
            borderWidth: 3,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "white",
            bodyColor: "white",
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function (context) {
                const label = context.dataset.label;
                const value = context.parsed.y;
                return `${label}: ${value} mmHg`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#666",
              font: {
                size: 12,
              },
              autoSkip: false,
            },
          },
          y: {
            min: 60,
            max: 180,
            grid: {
              color: "#e5e5e5",
              borderDash: [0, 0],
            },
            border: {
              display: false,
            },
            ticks: {
              stepSize: 20,
              color: "#666",
              font: {
                size: 12,
              },
              callback: function (value) {
                return value;
              },
            },
          },
        },
        elements: {
          point: {
            hoverBackgroundColor: "#ffffff",
            hoverBorderWidth: 3,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [diagnostic_history]);

  // Early return if no data
  if (!diagnostic_history || diagnostic_history.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="card-title-24pt">No diagnosis history available</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-5">
      {/* Main Title */}
      <h1 className="card-title-24pt mb-6">Diagnosis History</h1>

      {/* Blood Pressure Section */}
      <div className="bg-[#F4F0FE] rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side - Chart */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="inner-card-title-18pt ">Blood Pressure</h2>
              <div className="flex items-center gap-2 ">
                <span className="body-secondary-info-14pt">Last 6 months</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative h-80 w-full rounded-lg ">
              <canvas ref={chartRef} className="w-full h-full" />
            </div>
          </div>

          {/* Right Side - Legend & Stats */}
          <div className="flex-shrink-0 w-full lg:w-48">
            <div className="flex flex-col gap-6">
              {/* Systolic */}
              <div className="">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 ">
                    <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    <span className="body-emphasized-14pt">Systolic</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-gray-900">
                      {Number(latestValues.systolic) || 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      6-mo avg: {averages.systolic}
                    </div>
                    <div className="flex gap-3 body-secondary-info-14pt">
                      <img src={ArrowUp} alt="arrow-up" />
                      Higher than Average
                    </div>
                  </div>
                </div>
                {/* Divider line */}
                <div className="w-full h-px bg-gray-300 mt-6"></div>
              </div>

              {/* Diastolic */}
              <div className="">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span className="body-emphasized-14pt">Diastolic</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-gray-900">
                      {Number(latestValues.diastolic) || 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      6-mo avg: {averages.diastolic}
                    </div>
                    <div className="flex gap-3 body-secondary-info-14pt">
                      <img src={ArrowDown} alt="arrow-down" />
                      Lower than Average
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {vitalSignsData.map((vital, index) => (
          <VitalsCard data={vital} key={index} />
        ))}
      </div>
    </div>
  );
}
