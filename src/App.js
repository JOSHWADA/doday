import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleTaskDueDateChange = (event) => {
    setTaskDueDate(event.target.value);
  };

  const handleTaskCompletionToggle = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        completed: isTaskCompleted,
      };

      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskDescription('');
      setTaskDueDate('');
      setIsTaskCompleted(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="app">
      <h1>Task App</h1>

      <div className="add-task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        ></textarea>
        <input
          type="date"
          value={taskDueDate}
          onChange={handleTaskDueDateChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-details">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
            </div>
            <div className="task-actions">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletionToggle(task.id)}
              />
              <button onClick={() => handleDeleteTask(task.id)}>
                Delete Task
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
