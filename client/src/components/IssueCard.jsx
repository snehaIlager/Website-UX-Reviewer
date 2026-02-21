export default function IssueCard({ title, why, proof }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm mt-2 text-gray-600">
        <strong>Why:</strong> {why}
      </p>
      <p className="text-sm mt-2 text-gray-600">
        <strong>Proof:</strong> {proof}
      </p>
    </div>
  );
}