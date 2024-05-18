// queue.js
'use strict';

class Queue {
  constructor() {
    this.storage = [];
  }

  enqueue(item) {
    this.storage.push(item);
  }

  dequeue() {
    return this.storage.shift();
  }

  length() {
    return this.storage.length;
  }
}

module.exports = Queue;
