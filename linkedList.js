class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  
  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
  }

  
  size() {
    let count = 0;
    let current = this.headNode;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  // First node
  head() {
    return this.headNode;
  }

  // Last node
  tail() {
    let current = this.headNode;
    if (!current) return null;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  // Node at index
  at(index) {
    let current = this.headNode;
    let count = 0;
    while (current && count < index) {
      current = current.nextNode;
      count++;
    }
    return current || null;
  }

  // Remove last node
  pop() {
    if (!this.headNode) return null;

    if (!this.headNode.nextNode) {
      const removed = this.headNode;
      this.headNode = null;
      return removed;
    }

    let current = this.headNode;
    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }
    const removed = current.nextNode;
    current.nextNode = null;
    return removed;
  }

  
  contains(value) {
    let current = this.headNode;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  // Find index of value
  find(value) {
    let current = this.headNode;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return null;
  }

  // Print linked list
  toString() {
    let current = this.headNode;
    let str = "";
    while (current) {
      str += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    str += "null";
    return str;
  }

  // Extra Credit: Insert at index
  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new Node(value);
    let prev = this.at(index - 1);
    if (!prev) return null;

    newNode.nextNode = prev.nextNode;
    prev.nextNode = newNode;
  }

  
  removeAt(index) {
    if (index === 0) {
      const removed = this.headNode;
      this.headNode = this.headNode ? this.headNode.nextNode : null;
      return removed;
    }

    let prev = this.at(index - 1);
    if (!prev || !prev.nextNode) return null;

    const removed = prev.nextNode;
    prev.nextNode = removed.nextNode;
    return removed;
  }
}
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());