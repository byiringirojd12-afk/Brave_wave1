import { useState, useEffect } from "react";

export default function useXP() {
  const [xp, setXP] = useState(() => {
    return parseInt(localStorage.getItem("xp")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  const addXP = (amount) => {
    setXP(prev => prev + amount);
  };

  const level = Math.floor(xp / 500) + 1;

  return { xp, level, addXP };
}