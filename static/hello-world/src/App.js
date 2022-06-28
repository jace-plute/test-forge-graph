import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

function chartBuilder() {
  let projKey = "JAM";
  invoke("getAllIssuesInProject", {projectKey: projKey}).then(setData, (reason) => {
    console.log("rejected");
  });
  console.log("Issues: " + data.issues);
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Sprint 13",
        "Sprint 2",
        "Sprint 3",
        "Sprint 4",
        "Sprint 5",
        "Sprint 6",
      ],
      datasets: [
        {
          label: "Story Points for Team Wade",
          data: [30, 27, 32, 20, 25, 31],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Story Points Baseline",
          data: [28, 28, 28, 28, 28, 28],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function App() {
  console.log("ALL PROJECTS");
  const [data, setData] = useState(null);
  useEffect(() => {
    invoke("getAllProjects", {}).then(setData, (reason) => {
      console.log("rejected");
    });
  }, []);

  console.log("data :)" + data);
  

  return (
    <div>
      <div style={{ maxHeight: "500px", maxWidth: "500px" }}>
        <canvas id="myChart" width="100" height="100"></canvas>
        {chartBuilder()}
      </div>
    </div>
  );
}

export default App;
