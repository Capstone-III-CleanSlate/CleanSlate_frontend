import { useEffect, useState } from "react"


const apiUrl = import.meta.env.VITE_API_URL;
let loginUrl = `${apiUrl}/api/auth/google`;

//navigates the browser to Google
function handleClick() {
  window.location.href = loginUrl;
}




function App() {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  function handleScan() {
    console.log("Scan button clicked");
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
      <div style={{padding: "1rem", width: "200px"}}>
        <h1>CleanSlate</h1>
        <button onClick={handleClick}>Login with Google</button>
      </div>
    )
  }
  return (
    <div style={{ padding: "1rem", width: "200px" }}>
      <h1 className="header">CleanSlate</h1>

      <p>Connected as {user.email}</p>

      <button className="scan-btn" onClick={handleScan}>
        Scan my inbox
      </button>
    </div>
  );
}

export default App;
