var elem_display;
var queNY;
var stackTX;
var queCA;
var stackPOL;

function init() {
    init_hash();

    elem_display = document.getElementById("textbox");
}

function key_pressed(me) {
    if(get_text().length > 13)
        return;

    var c = me.innerText || me.textContent;
    append(c);
    clear_answer();
}

function doit() {
    var infix_str = get_text();

    Infix2Postfix(infix_str)    // postfix in queCA
    var str = queCA.data();

    var val = EvalPolish()
    set_answer(val);
}

function Infix2Postfix(infix_str) {
    queNY = Instr2Que(infix_str);
    //debug_NTC();
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
            //debugmsg("code = " + stackTX.peek() + "," + car + "," + code);
            var moveon = action(code, car);
            if(moveon) {
                queNY.deq();
            }
        }
        //debug_NTC();
    }
}

function Instr2Que(in_str) {
    in_str = in_str.replace(/ /g, '') + "!";
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
            debugmsg ('Error');
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
        //debug_CP();
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
// Utils
//=================================================================
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

function key_clear() {
    elem_display.innerHTML = "";
    clear_answer();
}

function key_del() {
    var str = elem_display.innerHTML;
    elem_display.innerHTML = str.slice(0, -1);
    clear_answer();
}

function clear_answer(){
    document.getElementById("answer").innerHTML = "_____";
}