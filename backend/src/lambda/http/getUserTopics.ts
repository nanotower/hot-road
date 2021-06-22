import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger';
const logger = createLogger('Get-User-Topics-Lambda');

import { getUserId } from '../../utils/getUserId'
import { TopicItem } from '../../interfaces/TopicItem'
import { getUserTopics } from '../../businessLogic/Topics'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event getuser', event)

  const userId = getUserId(event)
  const userTopics: TopicItem[] = await getUserTopics(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        userTopics
    })
  }
}