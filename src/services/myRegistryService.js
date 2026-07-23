import axios from "axios";

const API = "http://localhost:8080";

const headers = () => ({
  headers: {
    accessToken: localStorage.getItem("accessToken"),
  },
});

export const getSubmissions = async (role) => {
  const endpoint =
    role === "admin"
      ? `${API}/submissions`
      : `${API}/submissions/my-submissions`;

  const { data } = await axios.get(endpoint, headers());

  return data.submissions;
};

export const getCentralRegistry = async () => {
  const { data } = await axios.get(
    `${API}/qualified-buyers/central-registry`,
    headers(),
  );

  return data.qualified_buyers;
};

export const getRelyingRegistry = async () => {
  const { data } = await axios.get(
    `${API}/qualified-buyers/relying-registry`,
    headers(),
  );

  return data.relying_registry;
};

export const getIssuingRegistry = async () => {
  const { data } = await axios.get(
    `${API}/qualified-buyers/issuing-registry`,
    headers(),
  );

  return data.issuing_registry;
};
