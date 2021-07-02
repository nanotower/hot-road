import WsClient from './WsClient'

import { createLogger } from '../utils/logger'
const logger = createLogger('ApiGatewayWs');

export default class ApiGatewayWs extends WsClient {
  constructor() {
    super()
  }
  async postToConnection(sendTo: string, message: string) {
      logger.info('postToConnection', {sendTo, message})
      await this.apigwManagementApi
        .postToConnection({ ConnectionId: sendTo, Data: message })
        .promise();
  }
}
