import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { NewUpdateRequest } from '../../interfaces/NewUpdateRequest'
import { updateTopic } from '../../businessLogic/Topics'
import { getUserId } from '../../utils/getUserId'
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Update event', {event})
  const topicId = event.pathParameters.topicId
  const updatedTopic: NewUpdateRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  await updateTopic(updatedTopic, userId, topicId)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: 'modified'
    })
  }
}
