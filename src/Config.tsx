import { useEffect, useState } from "react";
import NodeCard from "./NodeCard";
import JsonConfigEditor from "./JsonConfigEditor";
import { fetchAppInfo } from "./api";

type Props = {
  id: string;
};

export default function AppConfiguration({ id }: Props) {
  const [info, setInfo] = useState<ReturnType<typeof fetchAppInfo> extends Promise<infer T> ? T : never | null>(null);
  const [json, setJson] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    function load() {
      fetchAppInfo(id).then(data => {
        if (mounted) {
          setInfo(data);
          setJson(JSON.stringify(data.configValue, null, 2));
        }
      });
    }
    load();
    const interval = setInterval(load, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id]);

  if (!info) return <div>Loading...</div>;

  return (
    <div className="config-root">
      <h2>{id}</h2>
      <div className="nodes-list-row">
        {info.nodes.map(node =>
          <NodeCard key={node.id} id={node.id} status={node.status} version={node.version} />
        )}
      </div>
      <JsonConfigEditor
        value={json}
        onChange={setJson}
        schema={info.configSchema}
        configValue={info.configValue}
      />
    </div>
  );
}
