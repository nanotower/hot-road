const apiId = '0150j6hay2';
const wsId = '1g8tb0196h';
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`;
export const wsEndpoint = `wss://${wsId}.execute-api.us-east-2.amazonaws.com/dev`;

export const authConfig = {
  domain: 'dev-9ts9zgd3.eu.auth0.com',            // Auth0 domain
  clientId: 'zIh8V7QKETHX89nWXLqvqS2LmnNy55cY',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
};
