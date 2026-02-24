<div style={styles.lessonList}>
  {lessons.map((l, idx) => {
    const prevLessonDone = idx === 0 ? true : progress[String(lessons[idx - 1].id)];
    const isDone = progress[String(l.id)];
    const isUnlocked = prevLessonDone;

    return (
      <div key={l.id} style={styles.lessonRow}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: isDone ? "#22c55e" : isUnlocked ? "#fbbf24" : "#e2e8f0",
            boxShadow: isDone ? "0 0 12px rgba(34, 197, 94, 0.4)" : "none",
            transition: "all 0.3s ease"
          }} />
          <div>
            {isUnlocked ? (
              <Link to={`/dashboard/lesson${l.id}`} style={styles.lessonLink}>{l.title}</Link>
            ) : (
              <span style={{ ...styles.lessonLink, opacity: 0.5, cursor: "not-allowed" }}>{l.title}</span>
            )}
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{l.category}</div>
          </div>
        </div>
        <span style={{
          fontSize: "0.8rem",
          fontWeight: 800,
          color: isDone ? "#22c55e" : "#94a3b8",
          letterSpacing: "0.5px"
        }}>
          {isDone ? "DONE" : isUnlocked ? "UNLOCKED" : "LOCKED"}
        </span>
      </div>
    );
  })}
</div>