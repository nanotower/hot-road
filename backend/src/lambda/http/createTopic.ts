import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import 'source-map-support/register';

import { getUserId } from '../../utils/getUserId';
import { createLogger } from '../../utils/logger';
const logger = createLogger('CreateTopicLambda');
import { createNewTopic } from '../../businessLogic/Topics';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);
  const userId = getUserId(event);
  const parsedBody = JSON.parse(event.body);

  const newItem = await createNewTopic(parsedBody, userId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      newItem,
    }),
  };
};
