export function validateEmail(sEmail) {
    var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
    var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
    var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
    var sQuotedPair = '\\x5c[\\x00-\\x7f]';
    var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
    var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
    var sDomain_ref = sAtom;
    var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
    var sWord = '(' + sAtom + '|' + sQuotedString + ')';
    var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
    var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
    var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
    var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

    var reValidEmail = new RegExp(sValidEmail);

    if (reValidEmail.test(sEmail)) {
        return true
    }
    return false
}

export function validateURL(val) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(val);
}

function validName(name) {
  var pattern = /^[a-z&\d\-_\s]+$/i

  var valid = new RegExp(pattern)

  if(valid.test(name)) {
    return true
  }

  return false
}

export function normalizeOnlyNumbers(value) {
  if(!value) return value;

  return value.replace(/[^\d]/g, '')
}

export function formatCreditCard(value) {
  if(!value) return ''
  // NNNN-NNNN-NNNN-NNNN
  const copyValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = copyValue.match(/\d{4,16}/g);
  const match = matches && matches[0] || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i+4))
  }

  if (parts.length) {
    return parts.join('-')
  }

  return value
}

export function formatCVV(value) {
  if (!value) return ''
  if (value.length > 3) return value.slice(0, -1)
  return value
}

export function luhnCheck(cardNum) {
  if(!cardNum) return 'This field is required!'

  // Luhn Check Code from https://gist.github.com/4075533
  // accept only digits, dashes or spaces

  const numericDashRegex = /^[\d\-\s]+$/
  if (!numericDashRegex.test(cardNum)) return 'No a valid format!';

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0;
  let nDigit = 0;
  let bEven = false;
  const strippedField = cardNum.replace(/\D/g, "");

  for (let i = strippedField.length - 1; i >= 0; i--) {
    const cDigit = strippedField.charAt(i);
    nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

      nCheck += nDigit;
      bEven = !bEven;
  }

  const final = (nCheck % 10) === 0;

  return final ? undefined : 'Please Enter a Valid Credit Card Number';
}

export function phoneFormat(number){
  if (!number) return ''

  // NNN-NNN-NNNN
  const splitter = /.{1,3}/g
  number = number.substring(0, 10)
  return number.substring(0, 7).match(splitter).join('-') + number.substring(7)
}
export const phoneParse = value => value ? value.replace(/-/g, '') : ''

export const required = value => value ? undefined : `This field is required!`
export const email    = value => value && validateEmail(value) ? undefined : 'Invalid email address!'
export const number   = value => isNaN(Number(value)) ? 'Must be a number!' : undefined
export const validUrl = value => value && validateURL(value) ? undefined : 'Invalid url format!'
export const name     = value => value && validName(value) ? undefined : 'Invalid format (Letters, numbers, dashes, and underscores only)!'
export const equals6  = value => value == 6 ? undefined : 'Bad math!'
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters!` : undefined
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters!` : undefined

export const maxLength3 = maxLength(3)
export const minLength3 = minLength(3)
