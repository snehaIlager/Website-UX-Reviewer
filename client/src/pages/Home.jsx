import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL including https://");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/review`, { url });

      navigate("/review", { state: { review: response.data } });

    } catch {
      setError("Failed to analyze website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-6">

      <h2 className="text-4xl font-bold text-center mb-8">
        Website UX Reviewer
      </h2>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-4 border rounded-xl"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-8 rounded-xl"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 mb-6">{error}</p>
      )}

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h3 className="text-2xl font-semibold mb-6">
          How It Works
        </h3>

        <ol className="space-y-4 list-decimal list-inside text-gray-700">
          <li>Enter a valid website URL.</li>
          <li>The system scrapes headings, forms, buttons and content.</li>
          <li>AI analyzes UX across 5 categories.</li>
          <li>A structured UX report is generated.</li>
          <li>You can download the report as a PDF.</li>
          <li>You can revisit past reports in the Reviews tab.</li>
        </ol>
      </div>
    </div>
  );
}