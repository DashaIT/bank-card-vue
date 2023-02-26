export function formatCardNumber(pan) {
    return pan.replace(/\D/g,'').replace(/(\d{4})/g, '$1 ').trim()
}

export function formatDate(date) {
    return date.replace(/\D/g,'').trim()
}

export function formatCvc(cvc) {    
    return cvc.replace(/\D/g,'').trim()
}