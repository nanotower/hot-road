import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

const XAWS = AWSXRay.captureAWS(AWS);

import { createLogger } from '../utils/logger';
const logger = createLogger('Message');

export class Message {
  constructor(
    private readonly apiGateway = new XAWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: `${process.env.API_ID}.execute-api.us-east-1.amazonaws.com/${process.env.STAGE}`,
    })
  ) {}

  async sendMessageToClient(connectionId, payload) {
    logger.info('Sending message to a connection', { connectionId });

    await this.apiGateway
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(payload),
      })
      .promise();
  }
}
