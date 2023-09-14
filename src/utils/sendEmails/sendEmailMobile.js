const Sib = require('sib-api-v3-sdk')

const sendEmailMobile = (key, senderEmail, appName, recipientEmail, OTP) => {
    var emailResult
    const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = key
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: senderEmail,
            name: appName,
        }
        const receivers = [
            {
                email: recipientEmail,
            },
        ]

        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Account Verification',
            htmlContent: `<h3>Thank you for signing up ${recipientEmail}</h3><p>Enter this OTP {{params.otp}} to verify your account.</p>`,
            params: {
                otp: OTP,
            },
        })
}

module.exports = {sendEmailMobile}