import Editor from "@monaco-editor/react";
import { useRef, useEffect } from "react";
import "./JsonConfigEditor.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  schema: any;
  configValue: any;
};

export default function JsonConfigEditor({ value, onChange, schema }: Props) {
  const monacoRef = useRef<any>(null);

  function handleEditorWillMount(monaco: any) {
    monacoRef.current = monaco;
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://myserver/foo-schema.json",
          fileMatch: ["*"],
          schema
        }
      ]
    });
  }

  useEffect(() => {
    if (monacoRef.current)
      monacoRef.current.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: "http://myserver/foo-schema.json",
            fileMatch: ["*"],
            schema
          }
        ]
      });
  }, [schema]);

  return (
      <Editor
        height="220px"
        defaultLanguage="json"
        value={value}
        onChange={v => onChange(v ?? "")}
        beforeMount={handleEditorWillMount}
        theme="vs-dark"
        options={{
          fontSize: 9,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          fixedOverflowWidgets: true,
          lineNumbers: "on",
        }}
      />
  );
}
