import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { saveConnection } from '../../businessLogic/WSConnections'
import { createLogger } from '../../utils/logger'
const logger = createLogger('connectLambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Websocket connect', {event})

  const connectionId = event.requestContext.connectionId
  const timestamp = new Date().toISOString()

  const item = {
    id: connectionId,
    timestamp
  }

  logger.info('Storing item', {item})
  await saveConnection(item)

  return {
    statusCode: 200,
    body: ''
  }
}
