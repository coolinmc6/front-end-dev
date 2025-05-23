# Algorithms

## Heap's Permute

```js
function heapPermute(array, n) {
  n = n || array.length; // set n default to array.length
  let permutations = [];
  if (n === 1) {
    permutations.push([...array]);
  } else {
    for (let i = 1; i <= n; i++) {
      heapPermute(array, n - 1).forEach(perm => permutations.push(perm));
        let j;
        
      if (n % 2) {
        j = 1;
      } else {
        j = i;
      }
      [array[n - 1], array[j - 1]] = [array[j - 1], array[n - 1]]; // swap
    }
  }
  return permutations;
}

// example usage:
const permutations = heapPermute([1, 2, 3]);
```

## Singly Linked List
```js
// Basic SinglyLinkedList
class SinglyLinkedListNode {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

function insertNodeAtTail(head, data) {
  // create new node
  const newNode = new SinglyLinkedListNode(data)
  
  // check for head - if not there, return new node
  if (!head) {
    return newNode;
  }
  
  // get tail
  let current = head
  while (current.next) {
    current = current.next
  }

  // set tail.next to new node
  current.next = newNode
  return head
}

function insertNodeAtHead(head, data) {
  const newNode = new SinglyLinkedListNode(data)
  
  if (!head) {
    return newNode;
  }
  
  newNode.next = head
  return newNode;
}
```