import { google } from 'googleapis';

import config from './config';


export const authenticate = () => {
    const defaultScope = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
      ]
    const auth = createConnection();
    const url = auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
      })
      return `<button style="font-size: 20px"><a href=${url}>Login with Google</a></button>`
  }

export const validate = async (code: string) => {
			const auth = createConnection()
			const data = await auth.getToken(code)
			const { tokens } = data
			auth.setCredentials(tokens)
			const plus = google.plus({ version: 'v1', auth })
			const me = await plus.people.get({ userId: 'me' })
            const { displayName, emails } = me.data
            const email = emails && emails.length && emails[0].value
            const validation = /@simplusinnovation\.com$/;
            if(!validation.test(email)){
                return false
            }

		  return {
              name: displayName,
              token: tokens.access_token
          }
}
  const createConnection = () => {
	return new google.auth.OAuth2(
	  config.clientId,
	  config.clientSecret,
	  config.redirect
	);
  }