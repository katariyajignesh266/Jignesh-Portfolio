import React from 'react';

function ConfirmModal({ isOpen, title, message, confirmText = 'Delete', onConfirm, onCancel, isDeleting = false }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title || 'Confirm Action'}</h3>
        </div>
        <p className="modal-message">{message || 'Are you sure you want to proceed?'}</p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

