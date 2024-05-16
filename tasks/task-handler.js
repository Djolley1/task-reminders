'use strict';

function handleTaskCreated(socket, task) {
  console.log('New task created:', task);
  // Schedule a reminder
  const timeUntilDue = new Date(task.dueDate) - new Date();
  setTimeout(() => {
    console.log('Reminder: Task is due!', task);
    console.log(timeUntilDue);
    // Optionally emit a reminder event
    socket.emit('task-reminder', task);
  }, timeUntilDue);
}

function handleTaskCompleted(task) {
  console.log('Task completed:', task);
}

function handleTaskDeleted(task) {
  console.log('Task deleted:', task);
}

module.exports = {
  handleTaskCreated,
  handleTaskCompleted,
  handleTaskDeleted,
};
