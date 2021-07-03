import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { deleteConnection } from '../../businessLogic/WSConnections'
import { createLogger } from '../../utils/logger'
const logger = createLogger('disconnectLambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Websocket disconnect', {event})

  const connectionId = event.requestContext.connectionId
  const key = {
      id: connectionId
  }

  logger.info('Removing item with key', {key})

  await deleteConnection(key)

  return {
    statusCode: 200,
    body: ''
  }
}
