type Node = {
  id: string;
  status: "synced" | "unsynced";
  version: string;
};

export type AppInfo = {
  nodes: Node[];
  configSchema: any;
  configValue: any;
};

// Remove export from type AppSummary
type AppSummary = {
  id: string;
  name: string;
};

function randomStatus(): "synced" | "unsynced" {
  return Math.random() < 0.5 ? "synced" : "unsynced";
}

export function fetchAppInfo(appId: string): Promise<AppInfo> {
  if (appId === "orion") return Promise.resolve({
    nodes: [
      { id: "a1b2c3d4-1111-2222-3333-444455556666", status: randomStatus(), version: "3.2.1" },
      { id: "b2c3d4e5-7777-8888-9999-aaaabbbbcccc", status: randomStatus(), version: "3.2.2" }
    ],
    configSchema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        region: { type: "string" },
        enabled: { type: "boolean" },
        nodes: { type: "array", items: { type: "string" } }
      },
      required: ["region", "enabled", "nodes"]
    },
    configValue: {
      region: "eu-west-1",
      enabled: true,
      nodes: [
        "a1b2c3d4-1111-2222-3333-444455556666",
        "b2c3d4e5-7777-8888-9999-aaaabbbbcccc"
      ]
    }
  });
  if (appId === "zenith") return Promise.resolve({
    nodes: [
      { id: "c3d4e5f6-dddd-eeee-ffff-000011112222", status: randomStatus(), version: "1.5.0" }
    ],
    configSchema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        analyticsEnabled: { type: "boolean" },
        refreshRate: { type: "number" },
        nodes: { type: "array", items: { type: "string" } }
      },
      required: ["analyticsEnabled", "refreshRate", "nodes"]
    },
    configValue: {
      analyticsEnabled: false,
      refreshRate: 60,
      nodes: [
        "c3d4e5f6-dddd-eeee-ffff-000011112222"
      ]
    }
  });
  if (appId === "atlas") return Promise.resolve({
    nodes: [
      { id: "d4e5f6g7-aaaa-bbbb-cccc-ddddeeeeffff", status: randomStatus(), version: "0.9.9" },
      { id: "e5f6g7h8-1234-5678-9abc-def012345678", status: randomStatus(), version: "1.0.0" }
    ],
    configSchema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        gatewayUrl: { type: "string" },
        secure: { type: "boolean" },
        nodes: { type: "array", items: { type: "string" } }
      },
      required: ["gatewayUrl", "secure", "nodes"]
    },
    configValue: {
      gatewayUrl: "https://atlas.example.com",
      secure: true,
      nodes: [
        "d4e5f6g7-aaaa-bbbb-cccc-ddddeeeeffff",
        "e5f6g7h8-1234-5678-9abc-def012345678"
      ]
    }
  });
  if (appId === "nova") return Promise.resolve({
    nodes: [
      { id: "f6g7h8i9-9999-8888-7777-666655554444", status: randomStatus(), version: "2.3.4" }
    ],
    configSchema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        syncInterval: { type: "number" },
        nodes: { type: "array", items: { type: "string" } }
      },
      required: ["syncInterval", "nodes"]
    },
    configValue: {
      syncInterval: 30,
      nodes: [
        "f6g7h8i9-9999-8888-7777-666655554444"
      ]
    }
  });
  if (appId === "home") return Promise.resolve({
    nodes: [
      { id: "1a2b3c4d-8e9f-4a1b-9c2d-7f6e5d4c3b2a", status: randomStatus(), version: "1.0.0" },
      { id: "5e6f7g8h-1b2c-3d4e-5f6a-7b8c9d0e1f2a", status: randomStatus(), version: "1.0.1" }
    ],
    configSchema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        settingA: { type: "boolean" },
        settingB: { type: "string" },
        nodes: { type: "array", items: { type: "string" } }
      },
      required: ["settingA", "settingB", "nodes"]
    },
    configValue: {
      settingA: true,
      settingB: "value",
      nodes: [
        "1a2b3c4d-8e9f-4a1b-9c2d-7f6e5d4c3b2a",
        "5e6f7g8h-1b2c-3d4e-5f6a-7b8c9d0e1f2a"
      ]
    }
  });
  if (appId === "about") return Promise.resolve({
    nodes: [
      { id: "9f8e7d6c-5b4a-3c2d-1e0f-2a3b4c5d6e7f", status: randomStatus(), version: "2.0.0" },
      { id: "4c3b2a19-8e7f-6d5c-4b3a-2c1d0e9f8b7a", status: randomStatus(), version: "2.0.1" },
      { id: "3e2d1c0b-9a8f-7e6d-5c4b-3a2b1c0d9e8f", status: randomStatus(), version: "2.1.0" }
    ],
    configSchema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        enabled: { type: "boolean" },
        description: { type: "string" },
        nodes: { type: "array", items: { type: "string" } }
      },
      required: ["enabled", "description", "nodes"]
    },
    configValue: {
      enabled: false,
      description: "About page config",
      nodes: [
        "9f8e7d6c-5b4a-3c2d-1e0f-2a3b4c5d6e7f",
        "4c3b2a19-8e7f-6d5c-4b3a-2c1d0e9f8b7a",
        "3e2d1c0b-9a8f-7e6d-5c4b-3a2b1c0d9e8f"
      ]
    }
  });
  return Promise.resolve({
    nodes: [],
    configSchema: {},
    configValue: {}
  });
}

export function fetchApps(): Promise<AppSummary[]> {
  return Promise.resolve([
    { id: "orion", name: "Orion Cloud" },
    { id: "zenith", name: "Zenith Analytics" },
    { id: "atlas", name: "Atlas Gateway" },
    { id: "nova", name: "Nova Sync" }
  ]);
}
