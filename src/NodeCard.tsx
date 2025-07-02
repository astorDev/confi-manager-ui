import "./NodeCard.css";

type NodeCardProps = {
  id: string;
  status: "synced" | "unsynced";
  version: string;
};

export default function NodeCard({ id, status, version }: NodeCardProps) {
  return (
    <div className="node-card">
      <div className="node-card-left">
        <span className="node-id">{id}</span>
        <span className="node-version">v{version}</span>
      </div>
      <div className="node-card-right">
        <span className={status === "synced" ? "node-status synced" : "node-status unsynced"}>
          {status}
        </span>
      </div>
    </div>
  );
}
