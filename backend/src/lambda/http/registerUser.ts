import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { getUser, registerUser } from '../../businessLogic/Users'
import { getUserId } from '../../utils/getUserId'
import { NewUserRequest } from '../../interfaces/NewUserRequest'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event registerUser: ', event)

  const userId = getUserId(event)
  const newUserRequest: NewUserRequest = JSON.parse(event.body)
  console.log('result: ', userId, newUserRequest)

  let newUser: any
  try {
    newUser = await registerUser(userId, newUserRequest)
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newUser
    })
  } 
}