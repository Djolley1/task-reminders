'use strict';

const Task = require('./task.js');
const Queue = require('./queue.js');
const tasks = new Task();
const taskQueue = new Queue();

function handleCreateTask(socket) {
  const task = tasks.createTask();
  console.log('Task created:', task);
  socket.emit('task-created', task);
  taskQueue.enqueue(task);
  console.log('Current task queue:', taskQueue.storage);
}

function handleCompleteTask(payload, socket) {
  const task = tasks.completeTask(payload.id);
  if (task) {
    console.log('Task completed:', task);
    socket.emit('task-completed', task);
    taskQueue.storage = taskQueue.storage.filter(t => t.id !== task.id);
    console.log('Current task queue:', taskQueue.storage); 
  } else {
    console.error('Task not found:', payload.id);
  }
}

function handleDeleteTask(payload, socket) {
  const task = tasks.deleteTask(payload.id);
  console.log('Task deleted:', task);
  if (task) {
    socket.emit('task-deleted', task);
    taskQueue.storage = taskQueue.storage.filter(t => t.id !== task.id);
    console.log('Current task queue:', taskQueue.storage);
  } else {
    console.error('Task not found:', payload.id);
  }
}

module.exports = {
  handleCreateTask,
  handleCompleteTask,
  handleDeleteTask,
};
