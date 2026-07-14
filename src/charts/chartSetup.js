import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.font.family =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
ChartJS.defaults.font.size = 12;
ChartJS.defaults.color = "#6f7f77";
ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
ChartJS.defaults.plugins.legend.labels.boxWidth = 7;
ChartJS.defaults.plugins.legend.labels.boxHeight = 7;

export const palette = {
  primary: "rgb(1, 71, 47)",
  primarySoft: "rgba(1, 71, 47, 0.12)",
  primaryMid: "#0b5c3d",
  gold: "#b8862e",
  goldSoft: "rgba(184, 134, 46, 0.15)",
  slate: "#2e5c8f",
  rose: "#9c3b3b",
  ink: "#3f5148",
  gridLine: "#e4e9e5",
};

export default ChartJS;
