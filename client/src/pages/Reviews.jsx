import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/status`)
      .then(res => setReviews(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-10">
        All UX Reports
      </h2>

      {reviews.length === 0 && (
        <p>No reports available.</p>
      )}

      {reviews.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            navigate("/review", { state: { review: item.review } })
          }
          className="bg-white p-6 rounded-xl shadow-md mb-4 cursor-pointer hover:shadow-lg transition"
        >
          <p className="font-semibold">{item.url}</p>

          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Score: {item.review.score}</span>
            <span>
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}