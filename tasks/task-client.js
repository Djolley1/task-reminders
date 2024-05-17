'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const {
  handleTaskCreated,
  handleTaskCompleted,
  handleTaskDeleted,
} = require('./task-handler.js');

const socket = io('http://localhost:3000/caps');

socket.on('task-created', (task) => handleTaskCreated(socket, task));
socket.on('task-completed', (task) => handleTaskCompleted(socket, task));
socket.on('task-deleted', handleTaskDeleted);

// Emit a create task event at intervals
setInterval(() => {

  socket.emit('create-task');
}, 4000);


// Simulate completing and deleting tasks
setTimeout(() => {
  const task = { id: 'some-task-id' };
  socket.emit('task-completed', task);
  socket.emit('task-deleted', task);
}, 6000);



module.exports ={};