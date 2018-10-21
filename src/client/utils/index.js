import range from 'lodash/range'
import padStart from 'lodash/padStart'

import { CARD_EXPIRATION_YEAR_RANGE } from 'Utils/globals'

export const months = range(1, 13).map(m => ({
  label: padStart(m, 2, '0'),
  value: m,
}))

export const years = range(
  new Date().getFullYear(),
  new Date().getFullYear() + CARD_EXPIRATION_YEAR_RANGE,
).map(y => ({
  label: y,
  value: y,
}))

export function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

export function flatten(collection = []) {
    return collection.reduce((acc, arr) => [...acc, ...arr], [])
}

export function randomString(len, charSet){
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length)
      randomString += charSet.substring(randomPoz,randomPoz+1)
  }
  return randomString
}

export function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function removeSpaces(string) {
    return String(string).split(' ').join('');
}

export function getCreditCardType(number) {
    if(!number) return '';

    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null)
      return "Visa";

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
      return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      return "Visa Electron";

    return "";
}

export const getMimeType = path => {
  if (! path ) {
    return 'other'
  }
  const parts = path.match(/[^\\]*\.(\w+)$/)
  if (! parts ){
    return 'other'
  }
  const ext = parts[1]
  switch(ext){
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'flif':
    case 'tif':
      return 'image'

    case 'mp4':
    case 'ogm':
    case 'ogv':
    case 'mpg':
    case '3gp':
    case 'wmv':
    case 'mov':
      return 'video'

    case 'pdf':
    case 'zip':
    case 'pptx':
    case 'pptx':
    case 'ppt':
    case 'pptm':
    case 'ai':
    case 'eps':
      return 'application'

    default:
      return 'other'
  }
}

export const pruneProperties = (data, desiredProp) => {
	if(!Array.isArray(data) && typeof data !== 'object'){
		console.log("===== pruneProperties ===== \nfunction argument 'data' is not an array")
		return;
	}
	if(!Array.isArray(desiredProp)){
		console.log("===== pruneProperties ===== \nfunction argument 'desiredProp' is not an array")
		return;
	}

	if(Array.isArray(data)){
		const updatedArray = []
		const ii = data.length
		const jj = desiredProp.length

		for(let i=0; i<ii; i++){
			const updatedObject = {};

			for(let j=0; j<jj; j++){
				updatedObject[desiredProp[j]] = data[i][desiredProp[j]]
			}

			updatedArray.push(updatedObject)
		}

		return updatedArray
	} else {
		const updatedObject = {};
		const jj = desiredProp.length

		for(let j=0; j<jj; j++){
			updatedObject[desiredProp[j]] = data[desiredProp[j]]
		}

		return updatedObject
	}
}
