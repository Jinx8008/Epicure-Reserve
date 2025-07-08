import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#7B2D26] text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Epicure Reserve
      </Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
