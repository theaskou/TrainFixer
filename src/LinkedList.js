// Factory function til at lave en node
function createNode(data) {
    return {
        data: data,
        next: null
    };
}

// Factory function til at lave en linket liste
function createLinkedList() {
    return {
        head: null,
        
        // Tilføj element til slutningen
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
        
        // Andre metoder som insert, remove osv.
    };
}

export { createLinkedList }