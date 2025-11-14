class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.sizeCount = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  // Prevent integer overflow by using modulo inside the loop
  hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // update if key already exists
    for (let entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    // otherwise insert new entry
    bucket.push({ key, value });
    this.sizeCount++;

    // check if we should grow
    if (this.sizeCount / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    return bucket.some(entry => entry.key === key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.sizeCount--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.sizeCount;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.sizeCount = 0;
  }

  keys() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        result.push(entry.key);
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        result.push(entry.value);
      }
    }
    return result;
  }

  entries() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        result.push([entry.key, entry.value]);
      }
    }
    return result;
  }

  grow() {
    const oldBuckets = this.buckets;

    // double capacity
    this.capacity *= 2;

    // reset
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.sizeCount = 0;

    // reinsert entries
    for (let bucket of oldBuckets) {
      for (let entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }
}


const test = new HashMap(0.75);

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.length());       // 12
console.log(test.capacity);       // 16
