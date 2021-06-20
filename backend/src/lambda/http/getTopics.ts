import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger';
const logger = createLogger('Get-Topics-Lambda');

import { TopicItem } from '../../interfaces/TopicItem';
import {getTopics} from '../../businessLogic/Topics'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event getTopics: ', event)

  const topics:TopicItem[] = await getTopics()
  logger.info('topics query res: ', {topics, isTopic: !!!topics})
  
  if (!!!topics) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'There are no topics'
      })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        topics
    })
  }
}