import { useEffect, useState } from "react"
import ScanCard from "./components/ScanCard";


const apiUrl = import.meta.env.VITE_API_URL;
const loginUrl = `${apiUrl}/api/auth/google`;

//navigates the browser to Google
function handleClick() {
  window.location.href = loginUrl;
}




function App() {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  
  async function handleLogout() {
    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      setUser(null);
    } catch (error) {
      console.error("Could not log out:", error);
    }
  }
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(`${apiUrl}/api/auth/me`, {
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("could not check authentication:", error);
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth();
  }, []);


  if (isCheckingAuth) {
    return <p>Checking connection...</p>
  }
  if (!user) {
    return (
      <div className="app-shell">
        <h1>CleanSlate</h1>

        <button
          type="button"
          className="login-btn"
          onClick={handleClick}
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <h1 className="header">CleanSlate</h1>

      <div className="account-bar">
        <p className="account-status">
          Signed in to {user.email}
        </p>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      <ScanCard />
    </div>
  );
}

export default App;
