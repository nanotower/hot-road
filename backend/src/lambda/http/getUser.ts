import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { getUser } from '../../businessLogic/Users'
import { getUserId } from '../../utils/getUserId'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event getuser: ', event)

  const userId = getUserId(event)
  let userInDb: any
  try {
    userInDb = await getUser(userId)
    console.log('result: ', userId, userInDb) 
  } catch (error) {
    console.error(error)
  }
  
  if (!userInDb) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        userInDb
    })
  }
}