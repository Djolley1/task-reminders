'use strict';

function handleTaskCreated(socket, task) {
  console.log('New task created:', task);
  // Schedule a reminder
  const timeUntilDue = new Date(task.dueDate) - new Date();
  setTimeout(() => {
    console.log('Reminder: Task is due!', task);
    // console.log(timeUntilDue);
    // Optionally emit a reminder event
    socket.emit('task-reminder', task);
  }, timeUntilDue);
}

function handleTaskCompleted(socket, task) {
  console.log('Task completed:', task);
  if (task) {
    task.status = 'completed';
    task.complete = true;
    socket.emit('task-completed', task);
  } else {
    console.error('Error: Task is undefined');
  }

}

function handleTaskDeleted(socket, task) {
  console.log('Task deleted:', task);
  socket.emit('task-deleted', task);
}

module.exports = {
  handleTaskCreated,
  handleTaskCompleted,
  handleTaskDeleted,
};
