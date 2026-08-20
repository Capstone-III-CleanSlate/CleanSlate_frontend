import { useEffect, useState } from "react";
import {
  addProtectedSender,
  getProtectedSenders,
  removeProtectedSender,
} from "../services/protectedSenders";
import "../styles/ProtectedSendersPage.css";

function ProtectedSendersPage({ onBack }) {
  const [senders, setSenders] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadSenders() {
      try {
        const protectedSenders = await getProtectedSenders();
        if (isActive) {
          setSenders(protectedSenders);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadSenders();
    return () => {
      isActive = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const sender = await addProtectedSender({ displayName, senderEmail });
      setSenders((currentSenders) => [...currentSenders, sender]);
      setDisplayName("");
      setSenderEmail("");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRemove(id) {
    setError("");

    try {
      await removeProtectedSender(id);
      setSenders((currentSenders) =>
        currentSenders.filter((sender) => sender.id !== id)
      );
    } catch (removeError) {
      setError(removeError.message);
    }
  }

  return (
    <section className="protected-senders-page" aria-labelledby="protected-senders-title">
      <button type="button" className="nav-btn" onClick={onBack}>
        Back to scan
      </button>

      <h1 id="protected-senders-title">Protected Senders</h1>
      <p>Emails from these senders are excluded from cleanup recommendations.</p>

      <form className="protected-senders-form" onSubmit={handleSubmit}>
        <label>
          Name <span aria-hidden="true">(optional)</span>
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            maxLength="255"
          />
        </label>
        <label>
          Sender email
          <input
            type="email"
            value={senderEmail}
            onChange={(event) => setSenderEmail(event.target.value)}
            placeholder="person@example.com"
            required
          />
        </label>
        <button type="submit" className="login-btn" disabled={isSaving}>
          {isSaving ? "Adding..." : "Protect sender"}
        </button>
      </form>

      {error && <p className="protected-senders-error" role="alert">{error}</p>}

      {isLoading ? (
        <p>Loading protected senders...</p>
      ) : senders.length === 0 ? (
        <p>No senders are protected yet.</p>
      ) : (
        <ul className="protected-senders-list">
          {senders.map((sender) => (
            <li key={sender.id} className="protected-sender-card">
              <div className="protected-sender-card__details">
                <strong>{sender.displayName || "Protected sender"}</strong>
                <span>{sender.senderEmail}</span>
              </div>
              <button
                type="button"
                className="protected-sender-card__remove"
                onClick={() => handleRemove(sender.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProtectedSendersPage;
