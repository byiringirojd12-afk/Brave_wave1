// Centralized utility for progress and time tracking
export const trackActivity = (id: string, email: string) => {
  const startTime = performance.now();
  let isSaved = false;

  // 1. SCROLL TRACKER (Intersection Observer)
  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting && !isSaved) {
        isSaved = true;
        // Mark locally
        localStorage.setItem(`lesson-${id}-completed`, "true");
        
        // Sync to Backend
        try {
          await fetch("/api/saveProgress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lessonId: id, email, status: 'completed' })
          });
        } catch (e) {
          console.error("Cloud sync failed, saved locally.");
        }
        observer.disconnect();
      }
    },
    { threshold: 0.9 }
  );

  const sentinel = document.getElementById("lesson-end-trigger");
  if (sentinel) observer.observe(sentinel);

  // 2. TIME TRACKER CLEANUP
  return () => {
    const endTime = performance.now();
    const spent = Math.floor((endTime - startTime) / 1000);
    const prev = Number(localStorage.getItem(`time-${id}`)) || 0;
    
    // Save cumulative time
    localStorage.setItem(`time-${id}`, String(prev + spent));
    observer.disconnect();
  };
};