import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Lesson() {
  const { id } = useParams();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = performance.now();

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          // ✅ MARK LESSON AS COMPLETED
          localStorage.setItem(`lesson-${id}`, "done");

          // ⏱ SAVE TIME SPENT
          const endTime = performance.now();
          const spent = Math.floor((endTime - startTime) / 1000);

          const prev =
            Number(localStorage.getItem(`time-${id}`)) || 0;
          localStorage.setItem(`time-${id}`, String(prev + spent));

          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    if (endRef.current) observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [id]);

  return (
    <div style={styles.page}>
      <h1>Lesson {id}</h1>

      <p style={styles.text}>
        {/* Simulated long lesson content */}
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}>
            This is lesson content. Read carefully. <br /><br />
          </span>
        ))}
      </p>

      {/* 👇 COMPLETION TRIGGER */}
      <div ref={endRef} style={styles.end}>
        🎉 Lesson Completed
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 20,
    fontFamily: "Arial",
  },
  text: {
    lineHeight: 1.7,
  },
  end: {
    marginTop: 100,
    padding: 20,
    background: "#4caf50",
    color: "#fff",
    textAlign: "center",
    borderRadius: 10,
  },
};
