const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

async function getOAuthTicket(token) {
    return await client.verifyIdToken({
        idToken: token,
        audience: process.env.OAUTH_CLIENT_ID,
    });
}

module.exports = getOAuthTicket;