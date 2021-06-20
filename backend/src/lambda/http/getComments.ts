import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger';
const logger = createLogger('Get-Comments-Lambda');

// import { CommentItem } from '../../interfaces/CommentItem';
import { getCommentsFromTopic } from '../../businessLogic/Comments'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event get comments', event)
  const topicId = event.pathParameters.topicId;
  const comments = await getCommentsFromTopic(topicId)
  logger.info('comments query res: ', {topicId, comments})
  
  if (!!!comments) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'There are no comments in this comment'
      })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        comments
    })
  }
}