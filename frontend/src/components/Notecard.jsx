import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      console.log("Deleting note with id:", id);

      // ✅ use /api/notes/:id because backend is set up like that
      const res = await axios.delete(`http://localhost:5001/api/notes/${id}`);
      console.log("Delete response:", res.data);

      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error(
        "Error in handleDelete:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-5 flex flex-col justify-between h-full">
        {/* Title + Content */}
        <Link to={`/note/${note._id}`} className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {note.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">
            {formatDate(note.createdAt)}
          </span>

          <div className="flex items-center gap-2">
            {/* Edit */}
            <button
              className="p-1 rounded-md hover:bg-gray-100 transition"
              onClick={() => navigate(`/note/${note._id}`)}
            
            >
              <PenSquareIcon className="w-4 h-4 text-gray-600" />
              
            </button>

            {/* Delete */}
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Date formatter
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default NoteCard;
