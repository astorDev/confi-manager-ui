import React from "react"
import "./SaveIcon.css"

export default function SaveIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M7.5 13.5l-3-3a1.25 1.25 0 1 1 1.77-1.77l1.73 1.73 5.73-5.73a1.25 1.25 0 1 1 1.77 1.77l-7.5 7.5z" stroke="currentColor" strokeWidth="0"/>
    </svg>
  )
}
