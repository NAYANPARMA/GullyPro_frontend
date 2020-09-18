export const storageService = {
    set,
    get,
    removeKey,
    clear
};

function set(key, value){
    if(typeof value == 'object'){
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
}

function get(key){
    return localStorage.getItem(key);
}

function removeKey(key){
    // console.log(key);
    
    return localStorage.removeItem(key)
}
function clear(){
    return localStorage.clear();
}