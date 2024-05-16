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
socket.on('task-completed', handleTaskCompleted);
socket.on('task-deleted', handleTaskDeleted);

// Emit a create task event at intervals
setInterval(() => {

  socket.emit('create-task');
}, 10000);

// Simulate completing and deleting tasks
setTimeout(() => {
  socket.emit('complete-task', { id: 'some-task-id' });
  socket.emit('delete-task', { id: 'some-task-id' });
}, 20000);

module.exports ={};