import { useEffect, useState } from "react";
import ScanFlow from "./components/ScanFlow";
import Navbar from "./components/Navbar"
import HeroIntro from "./components/HeroIntro";
import ProtectedSendersPage from "./components/ProtectedSendersPage";

const apiUrl = import.meta.env.VITE_API_URL;
const loginUrl = `${apiUrl}/api/auth/google`;

//opens Google login in a separate tab so the side panel itself stays open
function handleClick() {
  globalThis.chrome.tabs.create({ url: loginUrl });
}




function App() {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activePage, setActivePage] = useState("scan");


  async function handleLogout() {
    try {
      const { sessionToken } = await globalThis.chrome.storage.local.get("sessionToken");

      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${sessionToken}` },
      });

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      await globalThis.chrome.storage.local.remove("sessionToken");
      setUser(null);
      setActivePage("scan");
    } catch (error) {
      console.error("Could not log out:", error);
    }
  }
  async function checkAuth() {
    try {
      const { sessionToken } = await globalThis.chrome.storage.local.get("sessionToken");

      if (!sessionToken) {
        return;
      }

      const response = await fetch(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      })

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else if (response.status === 401) {
        // stored token is dead - the backend can't clear it for us, so we do it here
        await globalThis.chrome.storage.local.remove("sessionToken");
      }
    } catch (error) {
      console.error("could not check authentication:", error);
    } finally {
      setIsCheckingAuth(false)
    }
  }

  useEffect(() => {
    const initialAuthTimer = window.setTimeout(() => {
      void checkAuth();
    }, 0);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    }

    function handleMessage(message) {
      if (message.type === "CLEANSLATE_AUTH_UPDATED") {
        checkAuth();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    globalThis.chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      window.clearTimeout(initialAuthTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      globalThis.chrome.runtime.onMessage.removeListener(handleMessage);
    };
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
      <Navbar
        isAuthenticated={true}
        onProtectedSenders={() => setActivePage("protected-senders")}
      />

      <main className="main-content">
        {activePage === "protected-senders" ? (
          <ProtectedSendersPage onBack={() => setActivePage("scan")} />
        ) : (
          <ScanFlow onProtectedSenders={() => setActivePage("protected-senders")} />
        )}

        {activePage === "scan" && <div className="account-actions">
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
        </div>}
      </main>
    </div>
  );
}

export default App;
