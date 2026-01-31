export function trackScrollCompletion(lessonId, email, onComplete) {
  // Create a sentinel element at the bottom of your lesson
  const sentinel = document.querySelector("#lesson-end-trigger");
  if (!sentinel) return;

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      try {
        const response = await fetch("/api/saveProgress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId, email })
        });

        if (response.ok) {
          // Update local state so the UI reflects progress immediately
          localStorage.setItem(`lesson-${lessonId}-completed`, "true");
          if (onComplete) onComplete(); 
          
          // Stop observing once finished to save resources
          observer.disconnect();
        }
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  }, { threshold: 1.0 }); // 1.0 means the element must be fully visible

  observer.observe(sentinel);
  
  // Return the cleanup function
  return () => observer.disconnect();
}
