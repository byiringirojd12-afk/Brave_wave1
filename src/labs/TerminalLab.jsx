import React, { useState } from "react";

export default function TerminalLab({ onComplete }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Welcome to Cyber Terminal v1.0",
    "Type 'help' to begin."
  ]);

  const commands = {
    help: "Available commands: help, whoami, scan, clear",
    whoami: "student@cyberlab",
    scan: "Scanning localhost...\nOpen ports: 22 (SSH), 80 (HTTP)",
    clear: ""
  };

  const handleCommand = () => {
    const output = commands[input] || "Command not found";
    if (input === "scan") onComplete();
    if (input === "clear") {
      setHistory([]);
    } else {
      setHistory([...history, `> ${input}`, output]);
    }
    setInput("");
  };

  return (
    <div className="terminal">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCommand()}
        placeholder="Enter command..."
      />
    </div>
  );
}