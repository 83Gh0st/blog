import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/post');
        if (!response.ok) throw new Error('Network response was not ok');
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
    <div className="container mx-auto px-4 py-8">
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg p-4 transition transform hover:scale-105">
              <Post {...post} />
            </div>
          ))
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
}
