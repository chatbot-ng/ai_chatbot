const config = require("../config/config");
const axios = require('axios');
async function verifyRecaptcha (captcha){
    const {RECAPTCHA_KEY} = config;
    let response = false
    await axios( {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url:`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_KEY}&response=${captcha}`
    }).then(res => {
        response = res.data.success;
    })
    return response;
}

// export default verifyRecaptcha;
module.exports = verifyRecaptcha;