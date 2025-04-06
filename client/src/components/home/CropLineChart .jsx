import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CropLineChart = ({ cropData }) => {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {
      border: `rgba(${r}, ${g}, ${b}, 1)`,
      background: `rgba(${r}, ${g}, ${b}, 0.2)`,
    };
  };

  const data = {
    labels: ["Min Price", "Max Price"],
    datasets: cropData.map((crop) => {
      const colors = getRandomColor();
      return {
        label: crop?.commodity || "Rice",
        data: [crop?.min_price, crop?.max_price],
        borderColor: colors.border,
        backgroundColor: colors.background,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Production (in tons)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Top Trending Crops
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CropLineChart;
