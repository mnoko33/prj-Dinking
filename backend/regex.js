const emailRegex = function(email) {
    const re =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return re.test(email)
}

const passwordRegex = function(password) {
    const re = /^[a-zA-Z0-9]{8,16}$/;
    return re.test(password)
}

export { emailRegex, passwordRegex }