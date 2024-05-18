
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
  createdTasks.push(task);  
});

socket.on('task-completed', (task) => handleTaskCompleted(socket, task));
socket.on('task-deleted', (task) => handleTaskDeleted(socket, task));

setInterval(() => {
  socket.emit('create-task');
}, 2000);

setInterval(() => {
  if (createdTasks.length > 0) {
    const task = createdTasks[Math.floor(Math.random() * createdTasks.length)]; // Get a random task
    socket.emit('complete-task', { id: task.id });
  }
}, 4000);

setTimeout(() => {
  if (createdTasks.length > 0) {
    const task = createdTasks[Math.floor(Math.random() * createdTasks.length)]; // Get a random task
    socket.emit('task-completed', { id: task.id });
    socket.emit('task-deleted', { id: task.id });
  }
}, 6000);

module.exports = {};
