function createNode(data) {
  return {
    data: data,
    next: null,
  };
}

function createLinkedList() {
  return {
    head: null,
    tail: null,

    append(data) {
      const newNode = createNode(data);

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        return;
      }

      this.tail.next = newNode;
      this.tail = newNode;
    },

    appendList(list) {
      if (!list || !list.head) {
        return;
      }

      if (!this.head) {
        this.head = list.head;
        this.tail = list.tail;
        return;
      }

      this.tail.next = list.head;
      this.tail = list.tail;
    },
  };
}

export { createLinkedList };
