import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail'
import * as cors from 'cors';
import * as VALIDATORS from './helpers/DataValidator'

admin.initializeApp(functions.config().firebase);
const corsHandler = cors({origin: true});

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

const gmail = functions.config().gmail.email;

export const httpMail = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, () => {
    const body = req.body;
    console.log(body);

    if (VALIDATORS.isBodyInvalid(body)) {
      return res.status(400).send({message: 'Invalid request body'})
    }

    console.log('Valid body');

    const senderName  = VALIDATORS.toString(body.name);
    const senderMail = VALIDATORS.normalizeEmail(body.fromEmail);
    const senderMessage = VALIDATORS.toString(body.message);

    if (senderMessage.length <= 0) {
      return res.status(400).send({message: 'Email message cannot be empty'});
    }

    console.log('Valid senderMessage');

    if (senderMail.length <= 0) {
      return res.status(400).send({message: 'Sender email is invalid'});
    }

    console.log('Valid sender mail');

    if (senderName.length <= 0) {
      return res.status(400).send({message: 'Sender name is invalid'})
    }

    console.log('Valid sender name');

    const msg= {
      from: gmail,
      to: gmail,
      subject: `Message from ${senderMail}`,
      text: `Email from : ${senderMail}\n ${senderMessage}` ,
    };

    console.log(msg);

    console.log('Sending email');

    return sgMail.send(msg)
      .then(() => {
        console.log('Success');
        res.status(200).send({message: 'email sent!'})
      })
      .catch((err: Error | null) => {
        console.log(`Fail with $${err}`,);
        res.status(500).send(err)
        }
      );
  });
});
