import { useEffect, useState, useRef } from "react";
import NodeCard from "./NodeCard";
import JsonConfigEditor from "./JsonConfigEditor";
import { fetchAppInfo, patchAppName, fetchApps, type AppInfo } from "./api";
import "./AppConfiguration.css";
import AppTitleEditor from "./AppTitleEditor";

type Props = {
  id: string;
};

type AppSummary = { id: string; name: string };

export default function AppConfiguration({ id }: Props) {
  const [info, setInfo] = useState<AppInfo | null>(null);
  const [json, setJson] = useState<string>("");
  const [dirty, setDirty] = useState(false);
  const [newName, setNewName] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [appSummary, setAppSummary] = useState<AppSummary | null>(null);
  const [editMode, setEditMode] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    function load() {
      fetchAppInfo(id).then(data => {
        if (mounted) {
          setInfo(data);
          if (!dirty) setJson(JSON.stringify(data.configuration, null, 2));
        }
      });
      fetchApps().then(apps => {
        if (mounted) {
          const summary = apps.find(a => a.id === id);
          setAppSummary(summary || null);
          // Only set newName if not currently editing (renaming is false and input is not focused)
          if (summary && !renaming && document.activeElement !== nameInputRef.current) setNewName(summary.name);
        }
      });
    }
    load();
    const interval = setInterval(load, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id, dirty, renaming]);

  function handleJsonChange(v: string) {
    setJson(v);
    setDirty(true);
  }

  function handleRename() {
    setRenaming(true)
    patchAppName(id, newName.trim()).then(updated => {
      setAppSummary(updated)
      setNewName(updated.name)
      setEditMode(false) // Close edit mode only after a successful save
      if (window.dispatchEvent) window.dispatchEvent(new CustomEvent('app-name-updated', { detail: { id, name: updated.name } }))
    }).finally(() => setRenaming(false))
  }

  return (
    <div className="app-config-root">
      <AppTitleEditor
        name={appSummary?.name || id}
        id={id}
        editMode={editMode}
        setEditMode={setEditMode}
        newName={newName}
        setNewName={setNewName}
        renaming={renaming}
        appSummary={appSummary}
        nameInputRef={nameInputRef as React.RefObject<HTMLInputElement>}
        handleRename={handleRename}
      />
      <div className="app-config-nodes-list-row">
        {info && Object.entries(info.nodes).map(([nodeId, node]) =>
          <NodeCard key={nodeId} id={nodeId} status={(node as any).status} version={(node as any).version ?? ""} />
        )}
      </div>
      <JsonConfigEditor
        value={json}
        onChange={handleJsonChange}
        schema={info?.schema}
        configValue={info?.configuration}
      />
    </div>
  );
}
