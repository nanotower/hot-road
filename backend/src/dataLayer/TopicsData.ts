// import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
// import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// const XAWS = AWSXRay.captureAWS(AWS)
import DbClient from './DbClient';

import { TopicItem } from '../interfaces/TopicItem';

import { createLogger } from '../utils/logger';
const logger = createLogger('Topics-Data');

export class TopicsData extends DbClient {
  constructor(
    private readonly topicsTable = process.env.TOPICS_TABLE
  ) // private readonly index = process.env.INDEX_NAME,
  // private readonly bucketName = process.env.IMAGES_S3_BUCKET
  {
    super();
  }

  async createNewTopic(topic: TopicItem): Promise<TopicItem> {
    logger.info('creating topic', { topic });
    await this.docClient
      .put({
        TableName: this.topicsTable,
        Item: {
          ...topic,
        },
      })
      .promise();

    return topic;
  }

  async deleteTopic(topicId: string) {
    logger.info('delete topic', { topicId });
    await this.docClient
      .delete(
        {
          TableName: this.topicsTable,
          Key: {
            topicId,
          },
        },
        (err, data) => logger.info('res', { err, data })
      )
      .promise();
  }

  async getTopic(topicId: string): Promise<TopicItem> {
    logger.info('get Topic', { topicId });
    const topic = await this.docClient
    .get({
      TableName: this.topicsTable,
      Key: {
        topicId
      }
    })
    .promise()

    return topic.Item as TopicItem
  }
  async adjustTopicComment(topicId: string, operation: String) {
    logger.info('adjust Topic Comment', { topicId });
    
    const topic: TopicItem = await this.getTopic(topicId)
    logger.info('topic', { topic });

    let totalCommentsInTopic = topic.comments

    if (operation === 'addComment') {
      totalCommentsInTopic += 1
    }
    else if (operation === 'substractComment'){
      totalCommentsInTopic -= 1
    }
    logger.info('totalCommentsInTopic', { totalCommentsInTopic });

    const topicUpdated = await this.docClient.update({
      TableName: this.topicsTable,
      Key: {
        topicId
      },
      UpdateExpression: 'set #comments = :c',
      ExpressionAttributeValues: {
        ':c': totalCommentsInTopic
      },
      ExpressionAttributeNames: {
        '#comments': 'comments'
      },
      ReturnValues:"UPDATED_NEW"
    }).promise();

    return topicUpdated
  }

  async getTopics(): Promise<TopicItem[]> {
    const items = await this.docClient.scan({
      TableName: this.topicsTable
    }).promise()
    logger.info('getTopics', { items });

    return items.Items as TopicItem[]
  }

  // async registerUser(user: UserItem): Promise<UserItem> {
  //   await this.docClient
  //   .put({
  //     TableName: this.usersTable,
  //     Item: user
  //   })
  //   .promise()

  //   return user as UserItem
  // }

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
