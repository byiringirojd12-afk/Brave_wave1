export const BASE_URL = "http://localhost:5000/api";

export const getLessons = async () => {
  const res = await fetch(`${BASE_URL}/lessons`);
  return res.json();
};