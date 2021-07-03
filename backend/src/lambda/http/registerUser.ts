import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { registerUser } from '../../businessLogic/Users'
import { getUserId } from '../../utils/getUserId'
import { NewUserRequest } from '../../interfaces/NewUserRequest'

import { createLogger } from '../../utils/logger';
const logger = createLogger('registerUser');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event registerUser: ', event)

  const userId = getUserId(event)
  const newUserRequest: NewUserRequest = JSON.parse(event.body)
  logger.info('result: ', userId, newUserRequest)

  let newUser: any
  try {
    newUser = await registerUser(userId, newUserRequest)
  } catch (error) {
    logger.error(error)
  }

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newUser
    })
  } 
}