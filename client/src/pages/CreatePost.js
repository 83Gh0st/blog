import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null); // Changed to null for clarity
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault(); // Move this to the start of the function
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    
    // Check if a file was selected before accessing it
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
      // You may want to handle errors more gracefully
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text" // Corrected input type
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} 
      />
      <input
        type="text" // Corrected input type
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} 
      />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)} 
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
}
