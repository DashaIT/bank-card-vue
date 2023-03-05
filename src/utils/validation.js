export function validatePan(value) {
    let pan =  value.replace(/\D/g, '');
    return pan.length >= 16 && pan.length <= 19 && louna(pan)
}

const louna = (value) => {
    if (/[^0-9-\s]+/.test(value)) return false;

    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

export function checkDate(value) {    
    let date = value.replace(/\s/, '').split('/');
    let currentYear = parseInt(String(new Date().getFullYear()).slice(2,4));
    let currentMonth = new Date().getMonth() + 1;
    if (parseInt(date[1]) === currentYear && parseInt(date[0]) < currentMonth) {
        return false
    }    
    return parseInt(date[1]) >= currentYear && value.length >= 5
}