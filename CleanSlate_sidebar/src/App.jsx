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
      <nav className="navbar" aria-label="CleanSlate navigation">
        <span className="navbar-brand">CleanSlate</span>
      </nav>

      <main className="main-content">
        <p className="eyebrow">AI-powered Gmail cleanup</p>

        <p className="description">
          CleanSlate is a 3-part Chrome extension that scans your inbox,
          classifies all of your emails into helpful, user-friendly folders,
          making it simple to declutter a crowded dashboard. 
          The extension uses Google, Google Gemini, and
          human-written code to make your life a little easier.
        </p>

        <ScanCard />

        <div className="account-actions">
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
      </main>
    </div>
  );
}

export default App;
