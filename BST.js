//Node  class
class Node {
  constructor(data) {
    this.data = data;      // the value stored in this node
    this.left = null;      // pointer to the left child
    this.right = null;     // pointer to the right child
  }
}
//The Tree
class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
  if (array.length === 0) return null;

  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);

  root.left = this.buildTree(array.slice(0, mid));
  root.right = this.buildTree(array.slice(mid + 1));

  return root;
}
insert(value, node = this.root) {
  if (!node) return new Node(value);

  if (value < node.data) {
    node.left = this.insert(value, node.left);
  } else if (value > node.data) {
    node.right = this.insert(value, node.right);
  }
  return node;
}
deleteItem(value, node = this.root) {
  if (!node) return null;

  if (value < node.data) {
    node.left = this.deleteItem(value, node.left);
  } else if (value > node.data) {
    node.right = this.deleteItem(value, node.right);
  } else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    let successor = this.getMin(node.right);
    node.data = successor.data;
    node.right = this.deleteItem(successor.data, node.right);
  }
  return node;
}
getMin(node) {
  while (node.left) node = node.left;
  return node;
}
find(value, node = this.root) {
  if (!node) return null;
  if (node.data === value) return node;
  if (value < node.data) return this.find(value, node.left);
  return this.find(value, node.right);
}
levelOrderForEach(callback) {
  if (!callback) throw new Error("Callback required");

  let queue = [this.root];

  while (queue.length) {
    let node = queue.shift();
    callback(node);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
inOrderForEach(callback, node = this.root) {
  if (!callback) throw new Error("Callback required");

  if (!node) return;
  this.inOrderForEach(callback, node.left);
  callback(node);
  this.inOrderForEach(callback, node.right);
}
//preorder
preOrderForEach(callback, node = this.root) {
  if (!callback) throw new Error("Callback required");

  if (!node) return;
  callback(node);
  this.preOrderForEach(callback, node.left);
  this.preOrderForEach(callback, node.right);
}
postOrderForEach(callback, node = this.root) {
  if (!callback) throw new Error("Callback required");

  if (!node) return;
  this.postOrderForEach(callback, node.left);
  this.postOrderForEach(callback, node.right);
  callback(node);
}
height(node) {
  if (!node) return -1;
  let left = this.height(node.left);
  let right = this.height(node.right);
  return Math.max(left, right) + 1;
}
depth(value, node = this.root, d = 0) {
  if (!node) return null;
  if (node.data === value) return d;
  if (value < node.data) return this.depth(value, node.left, d + 1);
  else return this.depth(value, node.right, d + 1);
}

isBalanced(node = this.root) {
  if (!node) return true;

  let left = this.height(node.left);
  let right = this.height(node.right);

  if (Math.abs(left - right) > 1) return false;

  return this.isBalanced(node.left) && this.isBalanced(node.right);
}
rebalance() {
  let nodes = [];
  this.inOrderForEach((node) => nodes.push(node.data));
  this.root = this.buildTree(nodes);
}

}




function randomArray() {
  return Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100)
  );
}

const tree = new Tree(randomArray());

console.log("Balanced?", tree.isBalanced());

console.log("Level:");
tree.levelOrderForEach(n => console.log(n.data));

console.log("Inorder:");
tree.inOrderForEach(n => console.log(n.data));

tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log("Balanced?", tree.isBalanced());

tree.rebalance();

console.log("Balanced?", tree.isBalanced());
tree.levelOrderForEach(n => console.log(n.data));
