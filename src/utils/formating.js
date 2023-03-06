export function formatCardNumber(pan) {
    return pan.replace(/\D/g,'').replace(/(\d{4})(?=(\d*)+([^\d]|$))/g, '$1 ').trim()
}

export function formatDate(value, event) {
    if (event && event.inputType === 'deleteContentBackward') return value
    let formattedValue = value.replace(/\D/g, '').length > 4 ?
        value.replace(/\D/g, '').substring(0, 2) + value.replace(/\D/g, '').substring(4, 6) :
        value.replace(/\D/g, '').substring(0, 4)


    if (formattedValue.length >= 3) {
        formattedValue = formattedValue.substring(0, 2) + ' / ' + formattedValue.substring(2, 4);
    }

    if (formattedValue.length === 2) {
        formattedValue = formattedValue + ' / '
    }

    if (formattedValue.length > 2) {

        if (parseInt(formattedValue.split(' / ')[0]) === 0) {
            formattedValue = '01' + formattedValue.substring(2, 4);
        }

        if (parseInt(formattedValue.split(' / ')[0]) > 12) {
            formattedValue = 12 + formattedValue.substring(2, 4);
        }
    }
    return formattedValue
}

export function formatCvc(cvc) {    
    return cvc.replace(/\D/g,'').trim()
}