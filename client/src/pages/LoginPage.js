import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Incorrect username or password');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <form className="login p-10 bg-white rounded-lg shadow-lg w-full max-w-3xl lg:max-w-2xl md:w-3/4 sm:w-11/12 mx-auto transform hover:scale-105 transition duration-300 ease-in-out" onSubmit={login}>
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Please log in to continue</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          className="w-full px-5 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-150 ease-in-out"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-150 ease-in-out"
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Login
        </button>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <span className="text-purple-600 cursor-pointer hover:underline">Sign up</span>
        </p>
      </form>
    </div>
  );
}
