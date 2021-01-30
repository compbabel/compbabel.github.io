var elapsedTimeText;
var elapsedTimeIntervalRef;
var startTime;

function startStopwatch() {
    // Set start time based on whether it's stopped or resetted
    setStartTime();

    // Every second
    elapsedTimeIntervalRef = setInterval(() => {
        // Compute the elapsed time & display
        elapsedTimeText.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + timeAndDateHandling.getElapsedTime(startTime); //pass the actual record start time

        // Improvement: Can Stop elapsed time and resert when a maximum elapsed time
        //              has been reached.
    }, 1000);

}

function setStartTime() {
    elapsedTimeText = document.getElementsByClassName("elapsed-time-text")[0];
    startTime = new Date();
}

function stopStopwatch() {
    // Clear interval
    clearInterval(elapsedTimeIntervalRef);
}
