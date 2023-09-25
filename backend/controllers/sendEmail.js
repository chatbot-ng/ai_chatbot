import config from "../config/config.js";
import axios from 'axios';
async function sendEmail(to,subject,token) {
  const {SMTP_KEY,FRONTEND_URL} = config;
  const obj = {
        "Recipients": {
          "To": [
            to
          ],
        },
        "Content": {
          "Body": [
            {
              "ContentType": "HTML",
              // '<html><body><a referrerpolicy="no-referrer" href="localhost:3000/resetPassword/'+token+'>Reset Password</a><p>Link expires in 15 minutes</p></body></html>
              "Content": subject=='Reset Password'?'<h1>Reset Password</h1><p>Click on the link below to reset your password</p><a referrerpolicy="no-referrer" href="'+FRONTEND_URL+'/reset-password/'+token+'">Reset Password</a>':
                          '<h1>Verify Email</h1><p>Click on the link below to verify your email</p><a referrerpolicy="no-referrer" href="'+FRONTEND_URL+'/verify-email/'+token+'">Verify</a>'
            }
          ],
          "Headers": {
            "city": "New York",
            "age": "34"
          },
          "Postback": "string",
          "EnvelopeFrom": "ConceptLab <admin@conceptlab.live>",
          "From": "ConceptLab <admin@conceptlab.live>",
          "ReplyTo": "Sanket Sapate <sanketsapatevnit@gmail.com>",
          "Subject": subject,
          "Utm": {
            "Source": "string",
            "Medium": "string",
            "Content": "string"
          }
        },
        "Options": {
          "TimeOffset": null,
          "PoolName": "My Custom Pool",
          "ChannelName": "Channel01",
          "Encoding": "UserProvided",
          "TrackOpens": "true",
          "TrackClicks": "true"
        }
      }
    let response = false
    await axios( {
    headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': SMTP_KEY 
    },
    data: JSON.stringify(obj),
    method: 'POST',
    url: 'https://api.elasticemail.com/v4/emails/transactional'

  }).then(()=>response=true)
    .catch((error) => {console.error(error);});
    return response
}




// export default sendEmail;

export default sendEmail;