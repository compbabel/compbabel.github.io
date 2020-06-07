var elem_display;
var queNY;
var stackTX;
var queCA;
var stackPOL;
var parenth;

function init() {
    init_hash();
    parenth = 0;

    elem_display = document.getElementById("textbox");
}

function key_pressed(me) {
    if(get_text().length > 13)
        return;

    var c = me.innerText || me.textContent;
    if(!legal_char(c)) {
        alert("Illegal symbol!");
        return;
    }

    append(c);
    clear_answer();
}

function doit() {
    var infix_str = get_text();
    if(!infix_str)
        return;

    if(!llegal_exp(infix_str)) {
        alert("Illigal expression");
        return;
    }
    Infix2Postfix(infix_str)    // postfix in queCA

    var val = EvalPolish()
    set_answer(val);
}

function llegal_exp(str) {
    if(parenth != 0)
        return false;

    var c = str.charAt(str.length-1);
    if(isOperator(c) || (c == '.'))
        return false;
        
    return true;
}

function Infix2Postfix(infix_str) {
    queNY = Str2Que(infix_str);
    queNY.enq('!');
    debugger;

    stackTX = new Stack();
    stackTX.push('!');
    queCA = new Queue();
  
    var car;
    while(car = queNY.peek()) {
        if(isNumeric(car)) {
            queCA.enq(queNY.deq());
        }
        else {
            var code = get_code(stackTX.peek() + car);
            //error_message("code = " + stackTX.peek() + "," + car + "," + code);
            var moveon = action(code, car);
            if(moveon) {
                queNY.deq();
            }
        }
    }
}

function Str2Que(in_str) {
    in_str = in_str.replace(/ /g, '');
    // handle unary -
    if (in_str.charAt(0) == '-')
        in_str = '0' + in_str             // ex. -3*6
    in_str = in_str.replace(/\(-/g, "(0-")  // ex. (-2+4)
  
    var que = new Queue();
    var ddd = "";
    for(var i = 0; i < in_str.length; i++) {
        var c = in_str.charAt(i);
        if(isNumeric(c) || (c == '.'))
            ddd += c;
        else {
            if(ddd != "") {
                que.enq(ddd);
                ddd = "";
            }
            que.enq(c);
        }
    }
    if(ddd != "")
        que.enq(ddd);

    return que;
}

function action (code, car) {
    var moveon = true

    switch(code) {
        case 1:
            stackTX.push(car);
            break;
           
        case 2:
            queCA.enq(stackTX.pop());
            moveon = false;
            break;
                   
        case 3:
            stackTX.pop();
            break;
                       
        case 5:
            error_message ('Error');
            break;

        default:
            break;
    }                                                 
    return moveon;
}

function EvalPolish() {
    stackPOL = new Stack();
    while(car = queCA.deq()) {
        if (isNumeric(car))
            stackPOL.push(car);
        else
            DoOp(car);
    }
    var v = stackPOL.pop();
    v = Math.floor(v * 10000000 + 0.5) / 10000000;
    return v;
}

function DoOp(op) {
    var oper2 = Number(stackPOL.pop());
    var oper1 = Number(stackPOL.pop());
    var res;
    if (op == '+')
        res = oper1 + oper2;
    else if (op == '-')
        res = oper1 - oper2;
    else if (op == 'x')
        res = oper1 * oper2;
    else if (op == '/')
        res = oper1 / oper2;
    stackPOL.push(res)
}

//=================================================================
// Error checking
//=================================================================
function legal_char(c) {
    var str = get_text();
    var que = Str2Que(str);
    var tail = que.peektail();
    if(!tail) {
        if(isNumeric(c) || (c=='.') || (c=='-'))
            return true;
        else if(c == '(') {
            parenth += 1;
            return true;
        }
        else
            return false;
    }
   
    if(isNumeric(tail)) {
        if(c == '(')
            return false;
        if(c == ')') {
            if(parenth == 0)
                return false;
            else {
                parenth -= 1;
                return true;
            }
        }
        if(c == '.') {
            if(tail.match(/\./g))
                return false;
            else
                return true;
        }
        return true;
    }

    if(isOperator(tail)) {
        if(isNumeric(c) || (c == '.'))
            return true;
        if(c == '(') {
            parenth += 1;
            return true;
        }
        return false;
    }

    if(tail == '.') {
        return (isNumeric(c));
    }

    if(tail == '(') {
        if(isNumeric(c) || (c == '-')) {
            return true;
        }
        else if (c == '(') {
            parenth += 1;
            return true;
        }
        else
            return false;
    }

    if(tail == ')') {
        if(isOperator(c))
            return true;
        if(c == ')') {
            if(parenth == 0)
                return false;
            parenth -= 1;
            return true;
        }
        return false;
    }

    return true;    // Should not reach here
}

//=================================================================
// Utils
//=================================================================
function isOperator(c) {
    return ((c == '+') || (c == '-') || (c == 'x') || (c == '/'));
}

function isNumeric(s) {
    return !isNaN(s);
}

function get_text() {
    return elem_display.innerHTML;
}

function append(c) {
    Set_text(elem_display.innerHTML + c);
}

function Set_text(str) {
    elem_display.innerHTML = str;
}

function set_answer(str) {
    document.getElementById("answer").innerHTML = str;
}

function clear_answer(){
    document.getElementById("answer").innerHTML = "_____";
}

function key_clear() {
    elem_display.innerHTML = "";
    clear_answer();
    parenth = 0;
}

function key_del() {
    var str = elem_display.innerHTML;
    elem_display.innerHTML = str.slice(0, -1);
    clear_answer();
    var tail = str.charAt(str.length - 1);
    if(tail == '(')
        parenth -= 1;
    else if(tail == ')')
        parenth += 1;
}

function set_message(msg) {
    document.getElementById("msg").innerHTML = msg;
}