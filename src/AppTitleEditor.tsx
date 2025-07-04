import React, { useEffect, useRef } from "react"
import './AppTitleEditor.css'
import SaveIcon from "./SaveIcon"

type AppSummary = { id: string; name: string }

type Props = {
  name: string
  id: string
  editMode: boolean
  setEditMode: (v: boolean) => void
  newName: string
  setNewName: (v: string) => void
  renaming: boolean
  appSummary: AppSummary | null
  nameInputRef: React.RefObject<HTMLInputElement>
  handleRename: () => void
}

export default function AppTitleEditor({
  name,
  id,
  editMode,
  setEditMode,
  newName,
  setNewName,
  renaming,
  appSummary,
  nameInputRef,
  handleRename
}: Props) {
  const containerRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!editMode) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditMode(false)
        setNewName(appSummary?.name || "")
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editMode, appSummary, setEditMode, setNewName])

  function handleTitleClick() {
    if (!renaming) setEditMode(true)
    setTimeout(() => nameInputRef.current?.focus(), 0)
  }
  // Move setEditMode(false) to handleRename, so edit mode closes only after a successful save
  function tryRename(e?: React.FormEvent | React.KeyboardEvent) {
    if (e) e.preventDefault()
    if (!renaming) {
      if (!appSummary || newName !== appSummary.name) handleRename()
      else setEditMode(false)
    }
  }
  function handleNameInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') tryRename(e)
    if (e.key === 'Escape') {
      setEditMode(false)
      setNewName(appSummary?.name || "")
    }
  }
  // Remove onBlur from the input, so edit mode is only exited by save/cancel
  return (
    <form
      ref={containerRef}
      className="app-title-editor-root"
      onSubmit={tryRename}
    >
      {editMode ? (
        <div className="app-title-editor-edit-row">
          <input
            ref={nameInputRef}
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={handleNameInputKeyDown}
            disabled={renaming}
            className="app-title-editor-input"
            autoFocus
          />
          <button
            type="submit"
            disabled={renaming}
            className="app-title-editor-save"
            title="Save name"
          >
            <SaveIcon className="app-title-editor-save-icon" />
          </button>
        </div>
      ) : (
        <span
          className="app-title-editor-view app-title-editor-hoverable"
          onClick={handleTitleClick}
          title="Click to edit name"
        >
          {name}
        </span>
      )}
    </form>
  )
}
