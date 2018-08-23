/**
 * A .js file that provides methods to save to localStorage.
 * @author James Park
 * @date 2018-08-22
 */
function uploadItem(name,value){
    localStorage.setItem(name,value);
}

function downloadItem(name){
    return localStorage.getItem(name);
}