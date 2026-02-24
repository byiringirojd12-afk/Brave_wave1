export const handleRegister = async ({ username, email, password }) => {
  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to register");

    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    throw err;
  }
};

export const handleLogin = async ({ email, password }) => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to login");

    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    throw err;
  }
};