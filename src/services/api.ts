const API_URL = "http://localhost:5000";

export async function apiRequest(
  path: string,
  method = "GET",
  body?: any
) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
}
