
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Lesson() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      localStorage.setItem(`lesson-${id}-completed`, "true");
    }
  }, [id]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Lesson {id}</h1>
      <p>Lesson content goes here...</p>
    </div>
  );
}
