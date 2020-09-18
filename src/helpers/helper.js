import { storageService } from "../services";
import { notify } from "../common/Toast/toast";

export const helper = {
    percentWins,
    getLatLong,
    trimString,
    titleCaseStr,
    convertDate,
    previewFile,
    dataURItoBlob
}

function percentWins(params){
    return ((params.lastRank / params.spots)*100);
}

function getLatLong(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else { 
        notify("Geolocation is not supported by this browser.")
        //console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    // console.log('xxx');
    storageService.set('latLong', {'lat': position.coords.latitude, long: position.coords.longitude});
}

function trimString(paramString){
    // console.log(paramString);

    if(paramString != null){
        let textArr = paramString.split(' ');
        if(textArr.length > 1 && textArr[0].length > 2){
            textArr[0] = textArr[0][0];
        }
        let finalString = textArr.join(' ');

        if(finalString.length > 0){
            return finalString.substring(0,11)
        }
    } else {
        return paramString
    }
}

function titleCaseStr(param){
    let paramArr = param.split('');
    paramArr[0] = paramArr[0].toUpperCase();
    param = paramArr.join('');
    // console.log(paramArr, param);
    return param;
}

function convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

function previewFile(image, file){
    let previewImg = document.querySelector(image);
	let previewFile = document.querySelector(file).files[0];
    let reader  = new FileReader();
    // console.log(reader);
    reader.onloadend = function () {
		previewImg.src = reader.result;
    }
    
    if (file) {
		reader.readAsDataURL(previewFile);
		//$(imgNameId).html(imgName);
	// } else {
	// 	preview.src = dummyImg;

	}
}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}