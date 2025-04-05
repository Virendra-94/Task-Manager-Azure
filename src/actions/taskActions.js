export const addTask = (task) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_TASK',
      payload: task,
    });
    localStorage.setItem('tasks', JSON.stringify(getState().tasks));
  };
};

export const editTask = (task) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: task,
    });
    localStorage.setItem('tasks', JSON.stringify(getState().tasks));
  };
};

export const deleteTask = (taskId) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: taskId,
    });
    localStorage.setItem('tasks', JSON.stringify(getState().tasks));
  };
};

export const toggleTask = (taskId) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: taskId,
    });
    localStorage.setItem('tasks', JSON.stringify(getState().tasks));
  };
};

export const reorderTasks = (tasks) => {
  return (dispatch) => {
    dispatch({
      type: 'REORDER_TASKS',
      payload: tasks,
    });
  };
};