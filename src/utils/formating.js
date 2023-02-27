export function formatCardNumber(pan) {
    return pan.replace(/\D/g,'').replace(/(\d{4})(?=(\d*)+([^\d]|$))/g, '$1 ').trim()
}

export function formatDate(value, event) {
    if (event && event.inputType === 'deleteContentBackward') return value
    let formattedDate = value.replace(/\D/g,'');

    if (formattedDate.length === 2) {        
        formattedDate = formattedDate + ' / '
    }

    if (formattedDate.length >= 3) {
        formattedDate = formattedDate.slice(0,2) + ' / ' + formattedDate(2,4)
    }

    if (formattedDate.length > 2) {
        if (parseInt(formattedDate.split('/')[0]) === 0) {
            formattedDate = '01' + formattedDate.slice(2,4)
        }

        if (parseInt(formattedDate.split('/')[0]) > 12) {
            formattedDate = '12' + formattedDate.slice(2,4)
        }
    }
    return formattedDate
}

export function formatCvc(cvc) {    
    return cvc.replace(/\D/g,'').trim()
}