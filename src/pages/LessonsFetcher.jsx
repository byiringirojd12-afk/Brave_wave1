import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000/api";

export default function LessonsFetcher() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/lessons`)
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lessons:</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </div>
  );
}