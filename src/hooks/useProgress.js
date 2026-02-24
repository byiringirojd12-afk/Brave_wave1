import { useState, useEffect } from "react";

export default function useProgress() {
  const [completedModules, setCompletedModules] = useState(() => {
    return JSON.parse(localStorage.getItem("progress")) || [];
  });

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(completedModules));
  }, [completedModules]);

  const completeModule = (id) => {
    if (!completedModules.includes(id)) {
      setCompletedModules([...completedModules, id]);
    }
  };

  return { completedModules, completeModule };
}