const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'oravec.nikola@gmail.com',
        subject: 'Welcome to Task manager App',
        text: `Welcome to the app, ${name}, let me know ho you get allong with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'oravec.nikola@gmail.com',
        subject: 'We are sorry you are leaving us',
        text: `Dear, ${name} We are sorry to see you go. Please tell us what is your reason to leave our Application.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}