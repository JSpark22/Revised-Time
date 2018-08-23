/**
 * A .js file that operates a functioning stopwatch through provided methods
 * from proxy.js and background.js.
 * @author James Park
 * @date 2018-08-22
 */

/**
 *  Constantly updates and downloads current status of the stopwatch
 *  and decides which status is the correct time to display.
 */
function realTime(){
    paused = JSON.parse(downloadItem("paused"));
    elapsedTime = downloadItem("elapsedTime");
    h1.textContent = setTime(elapsedTime);
    if(paused){
        Stop();
    } else {
        Start();
    }
    // prevents application from running after an extensive amount of time.
    if(elapsedTime>1000000000000){
        Reset();
    }
}

/**
 * If the stopwatch is currently not running,
 * initiates the initiateDisplay() to change and display time.
 */
function Start(){
    if (!started){
        currTime = Date.now() - elapsedTime;
        initiateDisplay();
        started=true;
        uploadItem("paused",false);
    }
}

/**
 * Pauses the stopwatch
 */
function Stop(){
    clearInterval(running);
    started=false;
    uploadItem("paused",true);
}

/**
 * Resets the value of the time in the stopwatch.
 */
function Reset(){
    elapsedTime = 0;
    uploadItem("elapsedTime",0);
    clearInterval(running);
    started = false;
    uploadItem("paused",true);
    h1.textContent = "00:00:00";
    uploadItem("currTime",Date.now());
    // ensures that the stopwatch will stop.
    Stop();
}

// Execution begins here...
paused = JSON.parse(downloadItem("paused"));
currTime = downloadItem("currTime");
if(!paused){
    uploadItem(elapsedTime,timeDifference(currTime));
}
// Calls realTime() every 1 ms.
setInterval(realTime,1);

// Start button
start.onclick = Start;

// Stop button
stop.onclick = Stop;

// Clear button
clear.onclick = Reset;

// For debugging purposes.
debug.onclick = function(){
    alert("elapsed time is " + downloadItem("elapsedTime"));
};

