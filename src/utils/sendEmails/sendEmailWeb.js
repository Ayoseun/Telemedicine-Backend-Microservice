const Sib = require('sib-api-v3-sdk')

//const sendEmailWeb = (key, senderEmail, appName, recipientEmail, clientLink) => {
sendEmailWeb = (key, senderEmail, appName, recipientEmail, otp) => {
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
            htmlContent: `<h3>Thanks ${recipientEmail} for signing up. </h3><p>Here is your one time password <span style="color:green">{{params.otp}}.</span> Use this to verify your account.</p>`,
            params: {
                otp: otp,
            },
        })
}

module.exports = {sendEmailWeb}