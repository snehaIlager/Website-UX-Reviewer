import { useLocation, useNavigate } from "react-router-dom";

export default function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const review = location.state?.review;

  if (!review) {
    return (
      <div className="p-10 text-center">
        <p>No review found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
        >
          Back Home
        </button>
      </div>
    );
  }

  const totalIssues = Object.values(review.issues).flat().length;

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => navigate("/reviews")}
          className="text-gray-600 hover:text-black"
        >
          ← Back to Reviews
        </button>

        <button
          onClick={() => window.print()}
          className="px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
        >
          Download Report
        </button>
      </div>

      {/* Score Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">
          UX Score: {review.score}/100
        </h2>
        <p className="text-gray-600">
          Total Issues Found: {totalIssues}
        </p>
      </div>

      {/* Top Improvements */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">
          Key Improvements
        </h3>

        {review.top_improvements.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="border border-gray-300 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">
                CURRENT
              </p>
              <p>{item.before}</p>
            </div>

            <div className="border border-black p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">
                IMPROVED
              </p>
              <p className="font-medium">{item.after}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Issues */}
      {Object.entries(review.issues).map(([category, issues]) => (
        <div key={category} className="mb-14">
          <h3 className="text-xl font-semibold mb-6 capitalize">
            {category}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <h4 className="font-semibold mb-2">
                  {issue.title}
                </h4>

                <p className="text-sm mb-2">
                  <strong>Why:</strong> {issue.why}
                </p>

                <p className="text-sm">
                  <strong>Proof:</strong> {issue.proof}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}