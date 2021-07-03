import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import 'source-map-support/register';

import { getUserId } from '../../utils/getUserId';
import { createLogger } from '../../utils/logger';
const logger = createLogger('DeleteTopicLambda');
import { deleteTopic } from '../../businessLogic/Topics';
import { adjustUsersTopic } from '../../businessLogic/Users';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', event);
  const userId = getUserId(event);
  const topicInRequest = event.pathParameters.topicId;

  let deletedItem, updatedUser;

  try {
    deletedItem = await deleteTopic(topicInRequest);

    updatedUser = await adjustUsersTopic(userId, 'substractComment');
    logger.info('updatedUser', { deletedItem, updatedUser });
  } catch (error) {
    logger.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Cannot perform request',
      }),
    };
  }

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      deletedItem,
    }),
  };
};
