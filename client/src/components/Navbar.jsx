import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `hover:text-gray-400 ${
      location.pathname === path ? "font-semibold underline" : ""
    }`;

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">UX Reviewer</h1>

      <div className="space-x-8">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/reviews" className={linkStyle("/reviews")}>Reviews</Link>
        <Link to="/status" className={linkStyle("/status")}>Status</Link>
      </div>
    </nav>
  );
}