import React from "react";
import "./deleteModal.css";

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>你確定要刪除這筆紀錄嗎？</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>取消</button>
          <button className="confirm-btn" onClick={onConfirm}>確定</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
