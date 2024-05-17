'use strict';

const Chance = require('chance');
const chance = new Chance();

class Task {
  constructor() {
    this.tasks = [];
    this.todoList = [
      'Exercise for 30 minutes',
      'Organize closet',
      'Reply to all email',
      'Buy pet food',
      'Walk the dog',
      'Pay bills',
      'Set up automatic bill payment',
      'Backup important files to an external drive',
      'Take out the trash and recycling',
      'Buy groceries for the weekend',
      'Prepare meal plan for the week',
      'Clean kitchen thoroughly',
      'Water indoor plants',
      'Call the bank about the credit card issue',
      'Schedule doctor appointments',
      'Clean out the garage',
      'Dust the shelves and furniture',
      'Change bed sheets',
      'Write on a birthday card for Tom and buy gift',
      'Replace the air filters',
      'Update insurance policies',
      'Clean all windows',
      'Set up a meeting with the team',
      'Pick up the dry cleaning',
      'Review and edit photos',
      'Print and frame photos',
      'Plan date night',
      'Plan family game night',
      'Plan weekend trip with friends',
      'Create a vision board for trip',
    ];
  }

  createTask() {
    const task = {
      reminders: this.getRandomTodo(),
      status: 'pending',
      dueDate: chance.date({ string: true }),
      complete: false,
    };
    this.tasks.push(task);
    return task;
  }

  getRandomTodo() {
    const index = Math.floor(Math.random() * this.todoList.length);
    return this.todoList[index];
  }

  getTask(id) {
    return this.tasks.find(task => task.id === id);
  }

  completeTask(id) {
    const task = this.getTask(id);
    if (task) {
      task.status = 'completed';
      task.complete = true;
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