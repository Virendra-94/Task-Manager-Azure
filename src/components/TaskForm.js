import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../actions/taskActions';
import '../styles/TaskForm.css';

const TaskForm = ({ taskToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'Low'); // Default to Low
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : '');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !priority || !dueDate) {
      setError('All fields are required');
      return;
    }

    if (taskToEdit) {
      const updatedTask = { ...taskToEdit, title, description, priority, dueDate };
      dispatch(editTask(updatedTask));
      onSave(updatedTask);
    } else {
      dispatch(addTask({ title, description, priority, dueDate }));
    }

    setTitle('');
    setDescription('');
    setPriority('Low'); // Reset to Low after submission
    setDueDate('');
    setError('');
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <> 
    <h1 className="heading" >Task-Manager</h1>
    <form className="task-form" onSubmit={handleSubmit}>
      <input className="form-input" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="form-input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Moderate">Moderate</option>
        <option value="Low">Low</option>
      </select>
      <input className="form-input" type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      {error && <p className="error-message">{error}</p>}
      <div className="form-buttons">
        <button className="form-button" type="submit">{taskToEdit ? 'Save Task' : 'Add Task'}</button>
        {taskToEdit && <button className="form-button cancel-button" type="button" onClick={handleCancel}>Cancel</button>}
      </div>
    </form>
    </>
  );
};

export default TaskForm;
