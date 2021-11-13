const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');

function readHTMLFile(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
  });
};

let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
    }
});

class Mail {

    from = 'noreply@nategrift.com';

    constructor(email, subject, htmlFile, vars) {
        this.to = email;
        this.subject = subject;
        this.htmlFile = htmlFile;
        this.vars = vars;
    }

    send() {
        readHTMLFile(path.join(__dirname, '../templates/emails/', this.htmlFile), (err, html) => {
            const template = handlebars.compile(html);
            const compiledHTML = template(this.vars);
            let email = {
                from: this.from,
                to: this.to,
                subject: this.subject,
                html: compiledHTML
            }

            transport.sendMail(email, (err) => {
                if (err) {
                  throw new Error(err);
                } else {
                  return true;
                }
              });
        });
    }
}

module.exports = Mail;