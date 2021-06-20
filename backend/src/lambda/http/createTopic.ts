import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import 'source-map-support/register'

import { getUserId } from '../../utils/getUserId'
import { createLogger } from '../../utils/logger'
const logger = createLogger('CreateTopicLambda')
import { createNewTopic } from '../../businessLogic/Topics'
import { adjustUsersTopic } from '../../businessLogic/Users'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', event)
  const userId = getUserId(event)
  const parsedBody = JSON.parse(event.body)

  let newItem, updatedUser
  try {
    newItem = await createNewTopic(parsedBody, userId)
    updatedUser = await adjustUsersTopic(userId, 'addComment')
    logger.info('updateUser', {updatedUser})
  } catch (error) {
    logger.error('error', {error})
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Cannot perform request'
      })
    }
  }
  
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      newItem,
      updatedUser
    }),
  }
}
