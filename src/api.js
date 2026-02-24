const BASE = "http://localhost:5000/api";

export const getDashboard = (token) =>
  fetch(`${BASE}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

export const getLessons = () =>
  fetch(`${BASE}/lessons`).then(res => res.json());

export const completeLesson = (token, lessonId) =>
  fetch(`${BASE}/complete-lesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ lessonId })
  });

export const updateTime = (token, seconds) =>
  fetch(`${BASE}/time`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ seconds })
  });