import ASH from 'aws-ses-helper';
import AWS from 'aws-sdk'
import fs from 'fs'

const ses = new AWS.SES();
const params = JSON.parse(fs.readFileSync('parameters.json'));

export function handler(event, context) {

  let config = {
    sourceEmail: params.emailFrom,
    destinationEmails: params.emailTo,
    subject: event.Subject,
    body: event.MessageText
  };

  let checker = new ASH.CaptchaChecker(params.captchaSecret, event.captchaResponse);
  let sender = new ASH.EmailSender(ses, config);

  checker.checkCaptcha()
    .then(res => {
      return (!res.success) ? Promise.reject('The security code is invalid or expired') : Promise.resolve();
    })
    .then(() => sender.sendEmail())
    .then(res => {
      context.succeed(res);
    })
    .catch(err => {
      context.fail(err);
    })
  ;
}
