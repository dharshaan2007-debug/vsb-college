import { useEffect, useState } from "react";
import axios from "axios";
import localCollegeData from "../data/collegeData.json";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== ""
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.PROD
    ? ""
    : "http://localhost:5000";

export function useCollegeData() {
  const [data, setData] = useState(localCollegeData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/info`)
      .then((res) => {
        if (res.data && typeof res.data === "object") {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.warn("Using local college data fallback:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
