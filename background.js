/**
 * A .js file that provides interface for a functioning stopwatch.
 * @author James Park
 * @date 2018-08-22
 */

var h1 = document.getElementById('displayTime'), // time text
    start = document.getElementById('start'), // start button
    stop = document.getElementById('stop'), // stop button
    clear = document.getElementById('clear'), // reset button
    debug = document.getElementById('debugger'),
    seconds, minutes, hours, centiseconds,// time variables for formatting ease
    currTime = 0, newTime = 0, elapsedTime=0, // time variables for tracking time
    paused = true, // true if stopwatch has been paused, else false
    running,
    started = false; //true if stopwatch is running, else false

/**
 *  Correctly formats the time into a display string.
 *  @param milliseconds The input time in milliseconds
 *  @return display The output time converted from milliseconds to format 00:00:00.
 */
function setTime(milliseconds){

    centiseconds = seconds = minutes = hours = 0;
    // Correctly formats time.
    if(milliseconds>=10){
        centiseconds = Math.floor(milliseconds/10);
    }
    if(milliseconds >= 1000){
        seconds = Math.floor(milliseconds / 1000);
        centiseconds = centiseconds%100;
    } else {
        seconds = 0;
    }
    if (seconds >= 60){
        minutes = Math.floor(seconds / 60);
        seconds = seconds%60;
    }
    if (minutes >= 60){
        hours = Math.floor(minutes / 60);
        minutes = minutes%60;
    }
    let display = "";
    if (hours > 0) {
        if (hours > 9) {
            display += hours;
        } else {
            display += ("0" + hours);
        }
        display += ":";
    }
    if (minutes > 9){
        display += minutes;
    } else {
        display += ("0" + minutes);
    }
    display += ":";
    if (seconds > 9){
        display += seconds;
    } else {
        display += ("0" + seconds);
    }
    if (hours < 1){
        if (centiseconds < 10){
            display += (".0" + centiseconds);
        } else {
            display += ("." + centiseconds);
        }
    }
    return display;
}

/**
 *  Calculates time difference between the starting time and current time.
 *  @param currTime The time counter started.
 *  @return setTime(elapsedTime) Elapsed time formatted as 00:00:00.
 */

function timeDifference(currTime){
    newTime = Date.now();
    elapsedTime = newTime - currTime;
    h1.textContent = setTime(elapsedTime);
    uploadItem("elapsedTime",elapsedTime);
    uploadItem("currTime",currTime);
    return elapsedTime;
}

/**
 *  Constantly updates the content of h1 in popup.html every 1000ms.
 */

function initiateDisplay(){
    running = setInterval(function(){timeDifference(currTime)},10);
}

