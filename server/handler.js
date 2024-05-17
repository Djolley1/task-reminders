'use strict';

const Task = require('./task.js');
const tasks = new Task();

function handleCreateTask(socket) {
  const task = tasks.createTask();
  console.log('Task created:', task);
  socket.emit('task-created', task);
}

function handleCompleteTask(payload, socket) {
  const task = tasks.completeTask(payload.id);
  if (task) {
    console.log('Task completed:', task);
    socket.emit('task-completed', task);
  } else {
    console.error('Task not found:', payload.id);
  }
}
// function handleCompleteTask(payload, socket) {
//   console.log('payload ', payload);
//   const task = tasks.completeTask(payload.id);
//   if (task) {
//     task.status = 'completed';
//     task.complete = true;
//     socket.emit('task-completed', task);
//   } else {
//     console.error('Error: Task is undefined');
//   }

// }


function handleDeleteTask(payload, socket) {
  const task = tasks.deleteTask(payload.id);
  console.log('Task deleted:', task);
  socket.emit('task-deleted', task);
}

module.exports = {
  handleCreateTask,
  handleCompleteTask,
  handleDeleteTask,
};
