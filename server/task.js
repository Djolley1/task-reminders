'use strict';

const Chance = require('chance');
const chance = new Chance();

class Task {
  constructor() {
    this.tasks = [];
  }

  createTask() {
    const task = {
      id: chance.guid(),
      description: chance.sentence({ words: 5 }),
      status: 'pending',
      dueDate: chance.date({ string: true }),
    };
    this.tasks.push(task);
    return task;
  }

  getTask(id) {
    return this.tasks.find(task => task.id === id);
  }

  completeTask(id) {
    const task = this.getTask(id);
    if (task) {
      task.status = 'completed';
    }
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }

  getAllTasks() {
    return this.tasks;
  }
}

module.exports = Task;