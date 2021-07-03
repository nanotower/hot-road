import DbClient from './DbClient'

import { UserItem } from '../interfaces/UserItem'

import { createLogger } from '../utils/logger'
import { String } from 'aws-sdk/clients/appstream'
const logger = createLogger('Users-Data')

export class UsersData extends DbClient {
  constructor(
    private readonly usersTable = process.env.USERS_TABLE,
    // private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly thumbsBucketName = process.env.THUMBNAILS_S3_BUCKET
    ) {
    super()
      
  }

  async getUser(userId: string): Promise<UserItem> {
    logger.info('Getting user', {userId})
    const user = await this.docClient
    .get({
      TableName: this.usersTable,
      Key: {
          userId
      }
    })
    .promise()

    return user.Item as UserItem
  }

  async registerUser(user: UserItem): Promise<UserItem> {
    logger.info('Registering user', {user})
    
    // const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${user.userId}`
    const attachmentUrl = `https://${this.thumbsBucketName}.s3.amazonaws.com/${user.userId}.jpeg`
    const registeredUser = {...user, attachmentUrl}

    await this.docClient
    .put({
      TableName: this.usersTable,
      Item: registeredUser
    })
    .promise()

    return registeredUser as UserItem
  }

  async adjustUsersTopic(userId: string, operation: String): Promise<any> {
    logger.info('Adjust topic of user', {userId, operation})
    
    const user = await this.getUser(userId)

    let totalTopicsInUser

    if (operation === 'addComment') {
      totalTopicsInUser = user.topics + 1
    }
    else if (operation === 'substractComment'){
      totalTopicsInUser = user.topics - 1
    }

    const userUpdated = await this.docClient.update({
      TableName: this.usersTable,
      Key: {
        userId
      },
      UpdateExpression: 'set #topics = :t',
      ExpressionAttributeValues: {
        ':t': totalTopicsInUser
      },
      ExpressionAttributeNames: {
        '#topics': 'topics'
      },
      ReturnValues:"UPDATED_NEW"
    }).promise();

    return userUpdated
  }
}
