import { useState } from "react";

export default function LabSimulator({ lab }) {
  const [output, setOutput] = useState("");

  const runCommand = (cmd) => {
    if (cmd === "ls") setOutput("/home\n/docs\n/secret.txt");
    else if (cmd === "pwd") setOutput("/home/user");
    else setOutput("Command not found");
  };

  return (
    <div className="lab-simulator">
      <h3>🧪 {lab.title}</h3>
      <p>{lab.task}</p>
      <input type="text" placeholder="Enter command" onKeyDown={e => e.key === "Enter" && runCommand(e.target.value)} />
      <pre>{output}</pre>
    </div>
  );
}