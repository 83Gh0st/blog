import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);

    if (files && files.length > 0) {
      data.set('file', files[0]);
    }

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      const errorData = await response.json();
      console.error('Error creating post:', errorData);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">Create New Post</h2>
        <form onSubmit={createNewPost} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
          />
          <input
            type="file"
            onChange={ev => setFiles(ev.target.files)}
            className="w-full px-5 py-3 text-gray-500 rounded-lg bg-indigo-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
          />
          <Editor value={content} onChange={setContent} />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
