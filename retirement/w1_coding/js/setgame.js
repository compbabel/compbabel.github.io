var elem_message;
var elem_remaining;
var elem_Warning;

var deck = [];
var board = []; // array of "xxxx", x=0,1,2
var selected = [];  // array of integer indexes

var gameOver = false;

function init() {
    elem_message = document.getElementById("textbox");
    elem_remaining = document.getElementById("remaining");
    elem_Warning = document.getElementById("warning");

    deck = new Deck();
    board = [];
    selected = [];
    
    for(var i = 0; i < 12; i++) {
        var card = deck.drawCard();
        board.push(card);
    }

    displayNewBoard();
    gameOver = false;
    setStartTime();
    startStopwatch();
}

function butPressed(me) {
    var idn = +me.id;
    debugMessage("butPressed " + idn);

    if(selected.includes(idn)) {
        selected = removeVal(selected, idn);
        display();
        setMessage("");
        return;
    }
    
    if(selected.length >= 3)
        return;
    
    selected.push(idn);
    if(selected.length == 3)
        checkMatch();
    display();
}

function collectPressed(me) {
    if(gameOver)
        return;

    if(!match(selected)) {
        setMessage("No Match");
        return;
    }

    RemoveCollected();  
    if(board.length < 12) 
        draw3();
    displayNewBoard();
}

function hintPressed(me) {
    if(gameOver)
        return;

    if(match(selected)) {
        selected = [];
        display();
        setMessage("");
        return;
    }

    selected = [];
    selected = findOneSet();
    if(selected.length == 0)
        setMessage("None");
    else
        showSelected("hint: ");
        
    display();
}

function drawPressed(me) {
    if(gameOver)
        return;
        
    if(board.length < 18) {
        draw3();
        displayNewBoard();
    }
}

function newPressed(me) {
    init();
}

function checkPressed(me) {
    if(gameOver)
        return;

    arr = [];
    arr = findOneSet();
    if(arr.length == 0)
        setMessage("None");
    else
        setMessage("Yes");
}

function display() {
    var n = board.length;
    for(var i = 0; i < n; i++)
        setButByID("" + i, board[i], "floralwhite");

    for(var i = n; i < 18; i++)
        setButByID("" + i, "", "floralwhite");

    for(var i in selected) {
        var but = getButElem("" + selected[i]);
        but.style.backgroundColor = "yellow";
    }

    var remain = deck.getCount();
    elem_remaining.innerHTML = "&nbsp;&nbsp;Cards remaining: " + remain;
}

function setButByID(id, value, color) {
    but = getButElem(id);
    if(value == "") {
        but.style.display = "None";
        return;
    }
    setButValue(but, value);
    imgNumb = +value.charAt(0) * 27 + +value.charAt(1) * 9 + +value.charAt(2) * 3 + +value.charAt(3) + 1;
    but.src = "img/" + imgNumb + ".png";
    but.style.backgroundColor = color;
    but.style.display = "block";
}

function checkMatch() {
    if(match(selected))
        setMessage("Match");
    else
        setMessage("No Match");
}

function check() {
    arr = [];
    arr = findOneSet();
    return arr.length;
}

function draw3() {
    for(var i = 0; i < 3; i++) {
        var card = deck.drawCard();
        if(card)
            board.push(card);
    }
}

function displayNewBoard() {
    display();
    var len = check();
    if(len != 0) {
        setWarning("");
        setMessage("");
        return;
    }

    if(deck.getCount() != 0) {
        setWarning("**No solution, Draw cards**");
    }
    else {
        elapsedTimeText = document.getElementsByClassName("elapsed-time-text")[0];
        var str = elapsedTimeText.innerHTML;
        setWarning("");
        setMessage("Game Over " + str);
        gameOver = true;
    }
}

function RemoveCollected() {
    selected.sort(function(a, b){return b-a}); // sort numbers in descenting order
    for(var i = 0; i < selected.length; i++) {
        var ind = selected[i];
        board.splice(ind, 1);
    }
    selected = [];
}

function findOneSet() {
    var n = board.length;
    for (var i = 0; i < n; i++)
        for (var j = i + 1; j < n; j++)
            for (var k = j + 1; k < n; k++)
            {
                var set = [i, j, k];
                if (match(set))
                    return set;
            }
    return [];
}

function match(set)
{
    if(set.length < 3)
        return false;
        
    cardset = []
    for(var i in set)
        cardset.push(board[set[i]]);

    return matchCards(cardset);
}

function matchCards(cardset)
{
    for (var pos = 0; pos < 4; pos++) {
        features = [];
        for (var card = 0; card < 3; card++)
            features.push(cardset[card].charAt(pos));
        if (!allSame(features) && !allDiff(features))
             return false;
    }

    return true;
}

function allSame(features)
{
    return (features[0] == features[1]) && (features[1] == features[2]);
}
function allDiff(features)
{
    return (features[0] != features[1]) && (features[1] != features[2]) && (features[0] != features[2]);
}

function debugPressed() {
    showSelected("deb:");
    display();
}

//=================================================================
// Utils
//=================================================================
function getMessage() {
    return elem_message.innerHTML;
}

function setMessage(str) {
    elem_message.innerHTML = str;
}

function setWarning(str) {
    elem_Warning.innerHTML = str;
}

function debugMessage(str) {
    //setMessage(str);
}

function appendMessage(c) {
    SetText(elem_message.innerHTML + c);
}

function getButElem(theID) {
    return document.getElementById(theID);
}

function getButValue(but) {
    return but.value;
}

function setButText(but, str) {
    but.innerText = str;
}

function setButValue(but, str) {
    but.value = str;
}

function arrayShuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function removeVal(arr, value) {    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function showSelected(header) {
    str = header + selected.length + " ";
    for(var i in selected)
        str = str + selected[i] + "-";
    debugMessage(str);
}
