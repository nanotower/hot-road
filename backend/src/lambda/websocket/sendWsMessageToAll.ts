import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import 'source-map-support/register'

import { getUsersConnected } from '../../businessLogic/WSConnections'
import { sendMessageToClients } from '../../businessLogic/WSConnections'

import { createLogger } from '../../utils/logger'
const logger = createLogger('sendMEssageToAll')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', { event })

  const postData = JSON.parse(event.body).data

  logger.info({ postData })

  const usersConnected = await getUsersConnected()

  logger.info({ usersConnected })

  const messageSent = await sendMessageToClients(usersConnected, postData)

  return {
    statusCode: messageSent.statusCode,
    body: messageSent.body
  }
};
