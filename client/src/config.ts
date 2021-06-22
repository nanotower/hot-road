const apiId = 'llz932iul3'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`
// export const apiEndpoint = 'http://localhost:3003/dev'

export const authConfig = {
  // domain: 'dev-9ts9zgd3.eu.auth0.com',          // Auth0 domain
  domain: 'dev-9ts9zgd3.eu.auth0.com',            // Auth0 domain
  // clientId: 'yBDauQdTNmsNrR1RwnH60jUof6CWeZUj',          // Auth0 client id
  clientId: 'zIh8V7QKETHX89nWXLqvqS2LmnNy55cY',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
