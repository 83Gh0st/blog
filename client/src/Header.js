import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="bg-teal-700 text-white shadow-md p-4">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Leftmost MyBlog link */}
        <Link to="/" className="text-xl font-bold hover:text-teal-300">
          MyBlog
        </Link>

        {/* Rightmost Navigation links */}
        <div className="ml-auto flex items-center space-x-6"> {/* Add ml-auto to push items to the right */}
          {username ? (
            <>
              <Link to="/create" className="hover:text-teal-300">Create new post</Link>
              <a onClick={logout} className="hover:text-teal-300 cursor-pointer">Logout ({username})</a>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-teal-300">Login</Link>
              <Link to="/register" className="hover:text-teal-300">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
