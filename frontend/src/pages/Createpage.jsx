import { ArrowLeft, Plus, FileText } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ThinkBoard</h1>
            <Link to="/" className="btn btn-primary btn-outline border-white text-white hover:bg-white hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Notes
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Create Note Card */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Create New Note</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  className="input input-bordered w-full bg-gray-50 border-gray-200 focus:border-primary focus:bg-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Textarea */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Content</span>
                  <span className="label-text-alt text-gray-500">
                    {content.length} characters
                  </span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-40 bg-gray-50 border-gray-200 focus:border-primary focus:bg-white resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-4">
                <div className="text-sm text-gray-600">
                  {title.trim() && content.trim() ? (
                    <span className="text-success font-medium">✓ Ready to create</span>
                  ) : (
                    <span>Fill in both fields to continue</span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    to="/"
                    className="btn btn-ghost text-gray-600"
                  >
                    Cancel
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-primary gap-2 min-w-32" 
                    disabled={loading || !title.trim() || !content.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Create Note
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-info mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Writing Tips</h3>
                <p className="text-sm text-gray-600">Use descriptive titles and organize your thoughts clearly for better note-taking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;