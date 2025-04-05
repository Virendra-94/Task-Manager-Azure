import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useDrop } from 'react-dnd';
import Task from './Task';
import TaskForm from './TaskForm';
import { editTask, deleteTask, reorderTasks } from '../actions/taskActions';
import '../styles/TaskList.css';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [editingTask, setEditingTask] = useState(null);

  const priorityToNumber = (priority) => {
    switch (priority) {
      case 'High':
        return 1;
      case 'Moderate':
        return 2;
      case 'Low':
        return 3;
      default:
        return 0;
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.completed === (filter === 'completed'));
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      return priorityToNumber(a.priority) - priorityToNumber(b.priority);
    } else if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const moveTask = (dragIndex, hoverIndex) => {
    const draggedTask = sortedTasks[dragIndex];
    const updatedTasks = [...sortedTasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    dispatch(reorderTasks(updatedTasks));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveTask = (updatedTask) => {
    dispatch(editTask(updatedTask));
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const [, drop] = useDrop({ accept: 'TASK' });

  return (
    <div className="task-list-container">
      <div className="filter-sort-container">
        <div className="filter-container">
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="sort-container">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
      <div className="task-list" ref={drop}>
        {sortedTasks.map((task, index) => (
          <div key={task.id} className="task-item">
            <Task
              task={task}
              index={index}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              moveTask={moveTask}
            />
          </div>
        ))}
      </div>
      {editingTask && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelEdit}>&times;</span>
            <TaskForm
              taskToEdit={editingTask}
              onSave={handleSaveTask}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
