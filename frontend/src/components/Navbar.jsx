import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-green-800 text-green-100 border-b border-green-700">
      <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold font-mono tracking-tight">
          ThinkBoard
        </h1>

        <Link
          to="/create"
          className="btn bg-green-600 hover:bg-green-700 text-black-50 flex items-center gap-2 border-0"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Note</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
