var hash;

function init_hash() {
    var sym_cols = '!+-x/()';
    var sym_rows = '!+-x/(';
    
    var table = [[4,1,1,1,1,1,5],
    [2,2,2,1,1,1,2],
    [2,2,2,1,1,1,2],
    [2,2,2,2,2,1,2],
    [2,2,2,2,2,1,2],
    [5,1,1,1,1,1,3]]

    hash = new Map();
    for(var i = 0; i < 6; i++) {
        var char_row = sym_rows.charAt(i);
        for (var j = 0; j < 7; j++) {
            var char_col = sym_cols.charAt(j);
            var key = char_row + char_col;
            hash.set(key, table[i][j]);         
        }
    }
}

function get_code(key) {
    var val = hash.get(key);
    return val;
}

class Stack {
    constructor() {
        this.arr = [];
    }

    push(str) {
        this.arr.push(str);
    }

    pop() {
        return this.arr.pop();
    }

    peek() {
        return this.arr[this.arr.length-1];
    }
  
    data() {
        return this.arr;
    }
}

class Queue {
    constructor() {
        this.arr = [];
    }

    enq(str) {
        this.arr.push(str);
    }

    deq() {
        return this.arr.shift();
    }

    peek() {
        return this.arr[0];
    }

    peektail() {
        return this.arr[this.arr.length-1];
    }

    data() {
        return this.arr;
    }
}
