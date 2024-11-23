import React, { useState } from "react";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="modal">
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={updatedTask.dueDate}
          onChange={handleChange}
          required
        />
        <select name="status" value={updatedTask.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;
