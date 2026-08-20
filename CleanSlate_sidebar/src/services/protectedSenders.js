const apiUrl = import.meta.env.VITE_API_URL;

async function getAuthHeaders() {
  const { sessionToken } = await globalThis.chrome.storage.local.get("sessionToken");
  return sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {};
}

async function getErrorMessage(response, fallback) {
  const body = await response.json().catch(() => null);
  return body?.message || fallback;
}

export async function getProtectedSenders() {
  const response = await fetch(`${apiUrl}/api/protected`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Could not load protected senders."));
  }

  return response.json();
}

export async function addProtectedSender({ displayName, senderEmail }) {
  const response = await fetch(`${apiUrl}/api/protected`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...await getAuthHeaders(),
    },
    body: JSON.stringify({ displayName, senderEmail }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Could not protect this sender."));
  }

  return response.json();
}

export async function removeProtectedSender(id) {
  const response = await fetch(`${apiUrl}/api/protected/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Could not remove this protected sender."));
  }
}
