import Post from "../Post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/post");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-1 flex-grow">
        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105 overflow-hidden"
              >
                <Post {...post} />
              </div>
            ))
          ) : (
            <p className="text-center">No posts available.</p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-teal-800 text-white text-center py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <p className="text-sm sm:text-base md:text-lg">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm mt-2 opacity-75">
            Built with React & Tailwind CSS
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/about" className="hover:text-teal-300">About</Link>
            <Link to="/contact" className="hover:text-teal-300">Contact</Link>
            <Link to="/privacy" className="hover:text-teal-300">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
