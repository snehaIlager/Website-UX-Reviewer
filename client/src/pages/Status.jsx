import { useEffect, useState } from "react";
import axios from "axios";

export default function Status() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/status")
      .then(res => setStatus(res.data))
      .catch(() => setStatus({ error: "Failed to fetch status" }));
  }, []);

  if (!status) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        System Status
      </h2>

      {status.error ? (
        <p className="text-red-500">{status.error}</p>
      ) : (
        <div className="space-y-4">
          <p>Backend: {status.backend}</p>
          <p>Database: {status.database}</p>
          <p>LLM: {status.llm}</p>
        </div>
      )}
    </div>
  );
}