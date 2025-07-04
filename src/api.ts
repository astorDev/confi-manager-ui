type Node = {
  status: "synced" | "unsynced";
  version?: string;
};

export type AppInfo = {
  id: string;
  name: string;
  nodes: { [id: string]: Node };
  schema: any;
  configuration: any;
};

// Remove export from type AppSummary
type AppSummary = {
  id: string;
  name: string;
};

export function fetchAppInfo(appId: string): Promise<AppInfo> {
  return fetch(`/apps/${appId}`).then(r => r.json())
}

export function fetchApps(): Promise<AppSummary[]> {
  return fetch('/apps')
    .then(r => r.json())
    .then(data => data.items)
}

export function patchAppName(appId: string, name: string): Promise<{ id: string; name: string }> {
  return fetch(`/apps/${appId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then(r => r.json())
}
