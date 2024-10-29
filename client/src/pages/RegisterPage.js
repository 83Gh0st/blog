import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100">
      <form
        className="register p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-4 transform hover:scale-105 transition duration-300 ease-in-out"
        onSubmit={register}
      >
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">Create Account</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150 ease-in-out"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150 ease-in-out"
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Register
        </button>
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <span className="text-indigo-600 cursor-pointer hover:underline">Sign in</span>
        </p>
      </form>
    </div>
  );
}
