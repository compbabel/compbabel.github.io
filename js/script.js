var elem_stack;
var elem_peek;
var elem_poped;
var stack;

class Stack {
    constructor() {
        this.arr = [];
    }

    pop() {
        return this.arr.pop();
    }

    push(str) {
        this.arr.push(str);
    }

    peek() {
        if(this.arr.length > 0) {
            var len = this.arr.length;
            if(len > 0)
                return this.arr[len-1];
            else
                return undefined;
        }
    }

    data() {
        return this.arr;
    }
}

function init() {
    elem_stack = document.getElementById("stack");
    elem_peek = document.getElementById("peek");
    elem_poped = document.getElementById("poped");

    stack = new Stack();
    for(var i = 0; i < 5; i++)
        stack.push(gen_next())
    
    print_stack();
}

function pop_stack() {
    var poped = stack.pop();
    print_poped(poped);
}

function peek_stack() {
    var top = stack.peek();
    print_peek(top);
}

function push_stack() {
    var rand = gen_next();
    stack.push("" + rand);
    print_stack();
}

function print_poped(poped) {
    elem_poped.innerHTML = poped;
    print_stack();
}

function print_peek(peek) {
    elem_peek.innerHTML = peek;
}

function print_stack() {
    var arr = stack.data();
    elem_stack.innerHTML = arr;
}

function gen_next() {
    var rand = (Math.random() * 100);
    return Math.floor(rand);
}