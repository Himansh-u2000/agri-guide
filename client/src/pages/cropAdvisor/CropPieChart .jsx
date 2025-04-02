import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CropPieChart = () => {
  // Crop data with percentages
  const data = {
    labels: ["Rice", "Wheat", "Sugarcane", "Maize"],
    datasets: [
      {
        label: "Recommended Percentage",
        data: [35, 25, 20, 20], // Adjust percentages as needed
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-xl font-semibold mb-4">Crop Recommendation</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CropPieChart;
