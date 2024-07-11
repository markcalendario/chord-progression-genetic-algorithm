import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

function LineChart({ title, XAxisTitle, YAxisTitle, dataPoints }) {
  const data = {
    labels: dataPoints.map((_, index) => `Gen ${index}`),
    datasets: [
      {
        label: title,
        data: dataPoints,
        fill: false,
        borderColor: "#7f3bda",
        tension: 0.1
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white" // Legend label color
        }
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#0f172a" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
