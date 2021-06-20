// import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
// import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// const XAWS = AWSXRay.captureAWS(AWS)

import DbClient from './DbClient'

import { UserItem } from '../interfaces/UserItem'

import { createLogger } from '../utils/logger'
import { String } from 'aws-sdk/clients/appstream'
const logger = createLogger('Users-Data')

export class UsersData extends DbClient {
  constructor(
    // private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly usersTable = process.env.USERS_TABLE
    // private readonly index = process.env.INDEX_NAME,
    // private readonly bucketName = process.env.IMAGES_S3_BUCKET
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
    await this.docClient
    .put({
      TableName: this.usersTable,
      Item: user
    })
    .promise()

    return user as UserItem
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

  
  
//   export async function createGroup(
//     createGroupRequest: CreateGroupRequest,
//     jwtToken: string
//   ): Promise<Group> {
  
//     const itemId = uuid.v4()
//     const userId = getUserId(jwtToken)
  
//     return await groupAccess.createGroup({
//       id: itemId,
//       userId: userId,
//       name: createGroupRequest.name,
//       description: createGroupRequest.description,
//       timestamp: new Date().toISOString()
//     })
//   }
//   async getAllTodo(userId: string): Promise<TodoItem[]> {
//     logger.info('getAllTodo', {userId})
//     const todosList = await this.docClient
//       .query({
//         TableName: this.todoTable,
//         IndexName: this.index,
//         KeyConditionExpression: 'userId = :userId',
//         ExpressionAttributeValues: {
//           ':userId': userId
//         }
//       })
//       .promise()

//     const items = todosList.Items
//     return items as TodoItem[]
//   }

//   async createTodo(todo: TodoItem): Promise<TodoItem> {
//     logger.info('create todo', {todo})
//     const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${todo.todoId}`
//     await this.docClient
//       .put({
//         TableName: this.todoTable,
//         Item: {...todo, attachmentUrl }
//       })
//       .promise()

//     return todo
//   }

//   async deleteTodo(todo: TodoItem): Promise<{}> {
//     logger.info('deleteTodo', {todo})
//     await this.docClient
//     .delete({
//       TableName: this.todoTable,
//       Key: {
//         todoId: todo.todoId,
//         userId: todo.userId
//       }
//     }).promise();
//     return {}
//   }

//   async updateTodo(todoUpdate: TodoUpdate, userId: string, todoId: string): Promise <{}>{
//     logger.info('updateTodo', {todoUpdate, userId, todoId})
//     await this.docClient.update({
//       TableName: this.todoTable,
//       Key: {
//         todoId,
//         userId
//       },
//       UpdateExpression: 'set #name = :n, #dueDate = :due, #done = :d',
//       ExpressionAttributeValues: {
//         ':n': todoUpdate.name,
//         ':due': todoUpdate.dueDate,
//         ':d': todoUpdate.done
//       },
//       ExpressionAttributeNames: {
//         '#name': 'name',
//         '#dueDate': 'dueDate',
//         '#done': 'done'
//       }
//     }).promise();

//     return {}
//   }
}

// function createDynamoDBClient() {
//   if (process.env.IS_OFFLINE) {
//     console.log('Creating a local DynamoDB instance')
//     return new XAWS.DynamoDB.DocumentClient({
//       region: 'localhost',
//       endpoint: 'http://localhost:8000'
//     })
//   }

//   return new XAWS.DynamoDB.DocumentClient()
// }
