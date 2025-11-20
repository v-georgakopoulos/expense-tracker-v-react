import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContent";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "./ExpenseChart.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const { categories, totalsByCategory } = useContext(ExpenseContext);

  const data = {
    labels: categories,
    datasets: [
      {
        data: totalsByCategory,
        backgroundColor: ["#FF6384", "#4CAF50", "#FFCE56", "#36A2EB", "#FF9F40"],
        borderWidth: 2,
        borderColor: "#757171",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: '#8b8888',
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const value = tooltipItem.raw;
            const total = dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: €${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="expense-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
}
