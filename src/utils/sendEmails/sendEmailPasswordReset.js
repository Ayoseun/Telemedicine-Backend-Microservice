const Sib = require('sib-api-v3-sdk')

const sendEmailPasswordReset = (key, senderEmail, appName, recipientEmail, clientLink) => {
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
            subject: 'Password Reset',
            htmlContent: `<h3>You requested for a reset of you password using this email: ${recipientEmail}</h3><p>Click on this <a href="{{params.link}}" style="text-decoration:none; color:green">Link</a> To verify reset.</p>`,
            params: {
                link: clientLink,
            },
        })
}

module.exports = {sendEmailPasswordReset}