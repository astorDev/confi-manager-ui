import { useEffect, useState } from "react";
import NodeCard from "./NodeCard";
import JsonConfigEditor from "./JsonConfigEditor";
import { fetchAppInfo } from "./api";
import "./AppConfiguration.css";

type Props = {
  id: string;
};

export default function AppConfiguration({ id }: Props) {
  const [info, setInfo] = useState<ReturnType<typeof fetchAppInfo> extends Promise<infer T> ? T : never | null>(null);
  const [json, setJson] = useState<string>("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let mounted = true;
    function load() {
      fetchAppInfo(id).then(data => {
        if (mounted) {
          setInfo(data);
          if (!dirty) setJson(JSON.stringify(data.configuration, null, 2));
        }
      });
    }
    load();
    const interval = setInterval(load, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id, dirty]);

  function handleJsonChange(v: string) {
    setJson(v);
    setDirty(true);
  }

  if (!info) return <div>Loading...</div>;

  return (
    <div className="app-config-root">
      <h2>{id}</h2>
      <div className="app-config-nodes-list-row">
        {Object.entries(info.nodes).map(([nodeId, node]) =>
          <NodeCard key={nodeId} id={nodeId} status={node.status} version={node.version ?? ""} />
        )}
      </div>
      <JsonConfigEditor
        value={json}
        onChange={handleJsonChange}
        schema={info.schema}
        configValue={info.configuration}
      />
    </div>
  );
}
