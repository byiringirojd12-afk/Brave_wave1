import React, { useState } from "react";

export default function PortScannerLab({ addXP }) {
  const [result, setResult] = useState("");

  const scan = () => {
    setResult("Scanning 192.168.1.1...\nOpen Ports:\n- 22 (SSH)\n- 443 (HTTPS)");
    addXP(100);
  };

  return (
    <div>
      <button onClick={scan}>Run Port Scan</button>
      <pre>{result}</pre>
    </div>
  );
}