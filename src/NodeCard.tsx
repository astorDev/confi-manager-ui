import { useState } from "react";
import "./NodeCard.css";

type NodeCardProps = {
  id: string;
  status: "synced" | "unsynced";
  version: string;
};

function formatNodeId(id: string) {
  if (id.length <= 16) return id;
  const prefix = id.slice(0, 4);
  const suffix = id.slice(-4);
  return `${prefix}...${suffix}`;
}

export default function NodeCard({ id, status, version }: NodeCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <div className="node-card">
      <div className="node-card-left">
        <span
          className={`node-id node-id-copyable${copied ? " copied" : ""}`}
          title={copied ? "Copied!" : "Click to copy"}
          onClick={handleCopy}
        >
          {formatNodeId(id)}
        </span>
        <span className="node-version">v{version}</span>
        <div style={{ position: "relative", height: 0 }}>
          {copied && <div className="node-toast">Copied to clipboard</div>}
        </div>
      </div>
      <div className="node-card-right">
        <span
          className={
            status === "synced"
              ? "node-status synced"
              : "node-status unsynced"
          }
        >
          {status}
        </span>
      </div>
    </div>
  );
}
