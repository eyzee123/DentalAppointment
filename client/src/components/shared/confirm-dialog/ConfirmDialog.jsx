import React from 'react';
import './ConfirmDialog.css'; // styles below

export default function ConfirmDialog({ show, onConfirm, onCancel, message }) {
  if (!show) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>Confirm Action</h2>
        <p>{message || "Are you sure you want to continue?"}</p>
        <div className="dialog-actions">
          <button className="btn cancel" onClick={onCancel}>Cancel</button>
          <button className="btn confirm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
