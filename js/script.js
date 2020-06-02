function countdown() {
    var n = document.getElementById("countDownButton").innerHTML;
    if (n > 0) {
        document.getElementById("countDownButton").innerHTML = n - 1;
    }
}