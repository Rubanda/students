import React from "react"

const Snackbar = ({ content, type, onDismiss }) => {
  
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss()
    }
  }

  return (
    <div className={`paper-snackbar paper-snackbar--appear ${type ? "paper-snackbar--" + type : ""}`}>
      {content}
      <button onClick={handleDismiss} className={`action ${type ? "action--" + type : ""}`}>
        Dismiss
      </button>
    </div>
  )
}

export default Snackbar