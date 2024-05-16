'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const io = new Server();
const PORT = process.env.PORT || 3000;
const caps = io.of('/caps');

const { handleCreateTask, handleCompleteTask, handleDeleteTask } = require('./handler.js');

io.on('connection', handleConnection);

function handleConnection(socket) {
  socket.on('create-task', () => handleCreateTask(socket));
  socket.on('complete-task', (payload) => handleCompleteTask(payload, socket));
  socket.on('delete-task', (payload) => handleDeleteTask(payload, socket));
}

function startServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection);
}

io.listen(PORT);

module.exports = { startServer };
