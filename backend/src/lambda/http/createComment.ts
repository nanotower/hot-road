import {
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
  } from 'aws-lambda';
  import 'source-map-support/register';
  
  import { getUserId } from '../../utils/getUserId';
  import { createLogger } from '../../utils/logger';
  const logger = createLogger('Create-Comment-Lambda');
  import { createNewComment } from '../../businessLogic/Comments';
  import { adjustTopicComment } from '../../businessLogic/Topics';
  
  export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {

    logger.info('Processing event', event);
    const authorId = getUserId(event);
    const topicId = event.pathParameters.topicId;
    const {content, userId, authorPic} = JSON.parse(event.body);
    const authorObj = { authorId, authorPic}

    logger.info('variables', {authorId, topicId, content, userId, authorPic, authorObj});
  
    let newComment, updatedTopic
    // try {
      newComment = await createNewComment(userId, topicId, content, authorObj);
      updatedTopic = await adjustTopicComment(topicId, 'addComment')
      logger.info('updatedTopic', {updatedTopic, newComment})
    // } catch (error) {
    //   logger.error('error', {error})
    //   return {
    //     statusCode: 500,
    //     body: JSON.stringify({
    //       error: 'Cannot perform request'
    //     })
    //   }
    // }
    
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        newComment,
        updatedTopic
      }),
    };
  };
  