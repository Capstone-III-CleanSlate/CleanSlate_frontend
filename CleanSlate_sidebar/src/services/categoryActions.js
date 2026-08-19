const apiUrl = import.meta.env.VITE_API_URL;

async function acceptCategory(runId, labelName) {
  if (!apiUrl) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const response = await fetch(
    `${apiUrl}/api/gmail/categories/${runId}/accept`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        labelName,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Accept category failed with status ${response.status}.`
    );
  }

  return response.json();
}
async function trashCategory(runId, labelName) {
  if (!apiUrl) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const response = await fetch(
    `${apiUrl}/api/gmail/categories/${runId}/delete`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        labelName,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Trash category failed with status ${response.status}.`
    );
  }
}


export { 
    acceptCategory,
    trashCategory
 };