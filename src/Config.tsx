import { useState } from "react";
import NodeCard from "./NodeCard";

type Props = {
  id: string;
};

type Node = {
  id: string;
  status: "synced" | "unsynced";
  version: string;
};

const mockNodes: Node[] = [
  { id: "node-1", status: "synced", version: "1.0.0" },
  { id: "node-2", status: "unsynced", version: "1.0.1" },
  { id: "node-3", status: "synced", version: "1.1.0" }
];

const mockConfig = {
  settingA: true,
  settingB: "value",
  nodes: ["node-1", "node-2", "node-3"]
};

export default function AppConfiguration({ id }: Props) {
  const [json, setJson] = useState(JSON.stringify(mockConfig, null, 2));

  return (
    <div className="config-root">
      <h2>{id}</h2>
      <div className="nodes-list-row">
        {mockNodes.map(node =>
          <NodeCard key={node.id} id={node.id} status={node.status} version={node.version} />
        )}
      </div>
      <div>
        <div className="json-label">JSON Configuration</div>
        <textarea
          value={json}
          onChange={e => setJson(e.target.value)}
          rows={10}
          className="json-editor"
        />
      </div>
    </div>
  );
}
