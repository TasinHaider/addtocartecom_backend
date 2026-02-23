
function emailVerify(email) {
    let verifyPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return verifyPattern.test(email);
}

module.exports = emailVerify;