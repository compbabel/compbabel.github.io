var queNY;
var stackTX;
var queCA;
var stackPOL;

function init() {
    init_hash();
    document.getElementById("infix").value = "40 - 5 * (9 - 6) + 32";
}

function doit() {
    clearmsg();
    var infix_str = get_infix();

    Infix2Postfix(infix_str)    // postfix in queCA
    var str = queCA.data();
    document.getElementById("postfix").value = str;

    var val = EvalPolish()
    document.getElementById("result").value = val;
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
        if(isNumeric(c))
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
    return stackPOL.pop();
}

function DoOp(op) {
    var oper2 = Number(stackPOL.pop());
    var oper1 = Number(stackPOL.pop());
    var res;
    if (op == '+')
        res = oper1 + oper2;
    else if (op == '-')
        res = oper1 - oper2;
    else if (op == '*')
        res = oper1 * oper2;
    else if (op == '/')
        res = Math.floor(oper1 / oper2);
    stackPOL.push(res)
}

//=================================================================
// Utils
//=================================================================
function isNumeric(s) {
    return !isNaN(s);
}
function get_infix() {
    return document.getElementById("infix").value;
}

function debug_NTC() {
    debugmsg("(NY) " + queNY.data());
    debugmsg("(TX) " + stackTX.data());
    debugmsg("(CA) " + queCA.data());
}

function debug_CP() {
    debugmsg("(CA) " + queCA.data());
    debugmsg("(POL) " + stackPOL.data());
}

function debugmsg(msg) {
    //str = document.getElementById("debugtxt").innerHTML + "<br>" + msg;
    document.getElementById("debugtxt").innerHTML += "<br>" + msg;;
}

function clearmsg() {
    document.getElementById("debugtxt").innerHTML = "";
}
