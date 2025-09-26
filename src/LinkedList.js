function createNode(data) {
  return {
    data: data,
    next: null,
  };
}

function createLinkedList() {
  return {
    head: null,

    append(data) {
      const newNode = createNode(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }

      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    },
  };
}

export { createLinkedList };
