var elem_display;
var queNY;
var stackTX;
var queCA;
var stackPOL;
var parenth;

function init() {
    initHash();
    parenth = 0;

    elem_display = document.getElementById("textbox");
}

function keyPressed(me) {
    if(getText().length > 13)
        return;

    var c = me.innerText || me.textContent;
    if(!legalChar(c)) {
        alert("Illegal symbol!");
        return;
    }

    append(c);
    clearAnswer();
}

function doit() {
    var infix_str = getText();
    if(!infix_str)
        return;

    if(!legalExp(infix_str)) {
        alert("Illigal expression");
        return;
    }
    infix2Postfix(infix_str)    // postfix in queCA

    var val = evalPolish()
    setAnswer(val);
}

function legalExp(str) {
    if(parenth != 0)
        return false;

    var c = str.charAt(str.length-1);
    if(isOperator(c) || (c == '.'))
        return false;
        
    return true;
}

function infix2Postfix(infix_str) {
    queNY = str2Que(infix_str);
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
            var code = getCode(stackTX.peek() + car);
            var moveon = action(code, car);
            if(moveon) {
                queNY.deq();
            }
        }
    }
}

function str2Que(in_str) {
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
                       
        default:
            break;
    }                                                 
    return moveon;
}

function evalPolish() {
    stackPOL = new Stack();
    while(car = queCA.deq()) {
        if (isNumeric(car))
            stackPOL.push(car);
        else
            doOp(car);
    }
    var v = stackPOL.pop();
    v = Math.floor(v * 10000000 + 0.5) / 10000000;
    return v;
}

function doOp(op) {
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
function legalChar(c) {
    var str = getText();
    var que = str2Que(str);
    var tail = que.peekTail();
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

function getText() {
    return elem_display.innerHTML;
}

function append(c) {
    SetText(elem_display.innerHTML + c);
}

function SetText(str) {
    elem_display.innerHTML = str;
}

function setAnswer(str) {
    document.getElementById("answer").innerHTML = str;
}

function clearAnswer(){
    document.getElementById("answer").innerHTML = "_____";
}

function keyClear() {
    elem_display.innerHTML = "";
    clearAnswer();
    parenth = 0;
}

function keyDel() {
    var str = elem_display.innerHTML;
    elem_display.innerHTML = str.slice(0, -1);
    clearAnswer();
    var tail = str.charAt(str.length - 1);
    if(tail == '(')
        parenth -= 1;
    else if(tail == ')')
        parenth += 1;
}
