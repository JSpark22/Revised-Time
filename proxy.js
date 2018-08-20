function setCookie(paused,elapsedTime){
    var expire = new Date();
    expire.setTime(expire.getTime() + 31536000000);
    document.cookie = "paused =" + paused + ";" + "elapsedTime = " + elapsedTime + "expires=" + expire.toUTCString();
}

function getCookie(){
    var cString = document.cookie;
    
}