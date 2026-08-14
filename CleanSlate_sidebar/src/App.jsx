import { useEffect, useState } from "react";
import ScanFlow from "./components/ScanFlow";
import Navbar from "./components/Navbar"
import HeroIntro from "./components/HeroIntro";

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
        <Navbar isAuthenticated={false} />

        <main className="main-content">
          <HeroIntro />

          <button
            type="button"
            className="login-btn"
            onClick={handleClick}
          >
            Login with Google
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar isAuthenticated={true} />

      <main className="main-content">
        <ScanFlow />

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
