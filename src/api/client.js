import axios from "axios";

// Base client for the IRR backend. Point VITE_API_BASE_URL (in a .env file)
// at your registry API; until then, pages read from src/data/mockData.js.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export default client;
