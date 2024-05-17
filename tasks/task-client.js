// 'use strict';

// require('dotenv').config();
// const { io } = require('socket.io-client');
// const {
//   handleTaskCreated,
//   handleTaskCompleted,
//   handleTaskDeleted,
// } = require('./task-handler.js');

// const socket = io('http://localhost:3000/caps');

// const Tasks = require('../server/task.js');

// socket.on('task-created', (task) => handleTaskCreated(socket, task));
// socket.on('task-completed', (task) => handleTaskCompleted(socket, task));
// socket.on('task-deleted', handleTaskDeleted);

// // Emit a create task event at intervals
// setInterval(() => {

//   socket.emit('create-task');
// }, 2000);

// setInterval(() => {
//   console.log('Tasks.task ', Tasks.task);
//   socket.emit('complete-task');
// }, 4000);

// // Simulate completing and deleting tasks
// setTimeout(() => {
//   const task = { id: 'some-task-id' };

//   socket.emit('task-completed', task);
//   socket.emit('task-deleted', task);
// }, 6000);



// module.exports ={};

'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const {
  handleTaskCreated,
  handleTaskCompleted,
  handleTaskDeleted,
} = require('./task-handler.js');

const socket = io('http://localhost:3000/caps');

let createdTasks = [];

socket.on('task-created', (task) => {
  handleTaskCreated(socket, task);
  createdTasks.push(task);  // Store the created task
});

socket.on('task-completed', (task) => handleTaskCompleted(socket, task));
socket.on('task-deleted', handleTaskDeleted);

// Emit a create task event at intervals
setInterval(() => {
  socket.emit('create-task');
}, 2000);

// Emit a complete task event using a valid task ID
setInterval(() => {
  if (createdTasks.length > 0) {
    const task = createdTasks[Math.floor(Math.random() * createdTasks.length)]; // Get a random task
    socket.emit('complete-task', { id: task.id });
  }
}, 4000);

// Simulate completing and deleting tasks
setTimeout(() => {
  if (createdTasks.length > 0) {
    const task = createdTasks[Math.floor(Math.random() * createdTasks.length)]; // Get a random task
    socket.emit('task-completed', { id: task.id });
    socket.emit('task-deleted', { id: task.id });
  }
}, 6000);

module.exports = {};
