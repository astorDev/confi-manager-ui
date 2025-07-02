type Node = {
  status: "synced" | "unsynced";
  version?: string;
};

export type AppInfo = {
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
  return Promise.resolve([
    { id: "orion", name: "Orion Cloud" },
    { id: "zenith", name: "Zenith Analytics" },
    { id: "atlas", name: "Atlas Gateway" },
    { id: "nova", name: "Nova Sync" }
  ]);
}
