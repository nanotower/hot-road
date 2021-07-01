import DbClient from './DbClient'

import { TopicItem } from '../interfaces/TopicItem'
import { NewUpdateRequest } from '../interfaces/NewUpdateRequest'

import { createLogger } from '../utils/logger'
const logger = createLogger('Topics-Data');

export class TopicsData extends DbClient {
  constructor(
    private readonly topicsTable = process.env.TOPICS_TABLE,
    private readonly userIndex = process.env.USER_ID_INDEX
  ) 
  {
    super()
  }

  async createNewTopic(topic: TopicItem): Promise<TopicItem> {
    logger.info('creating topic', { topic })
    await this.docClient
      .put({
        TableName: this.topicsTable,
        Item: {
          ...topic,
        },
      })
      .promise()

    return topic
  }

  async deleteTopic(topicId: string) {
    logger.info('delete topic', { topicId })
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
      .promise()
  }

  async getTopic(topicId: string): Promise<TopicItem> {
    logger.info('get Topic', { topicId })
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
    logger.info('adjust Topic Comment', { topicId })
    
    const topic: TopicItem = await this.getTopic(topicId)
    logger.info('topic', { topic })

    let totalCommentsInTopic = topic.comments

    if (operation === 'addComment') {
      totalCommentsInTopic += 1
    }
    else if (operation === 'substractComment'){
      totalCommentsInTopic -= 1
    }
    logger.info('totalCommentsInTopic', { totalCommentsInTopic })

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
    logger.info('getTopics', { items })

    return items.Items as TopicItem[]
  }

  async getUserTopics(userId: string): Promise<TopicItem[]> {
    logger.info('getUserTopics', { userId })

    const topicsList = await this.docClient
        .query({
          TableName: this.topicsTable,
          IndexName: this.userIndex,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
            ':userId': userId
          }
        })
        .promise()
    return topicsList.Items as TopicItem[]
  }

  async updateTopic(updatedTopic: NewUpdateRequest, userId: string, topicId: string) {
    logger.info('getUserTopics', { updatedTopic, userId, topicId })

    const updatedTopicRes = await this.docClient.update({
      TableName: this.topicsTable,
      Key: {
        topicId,
      },
      UpdateExpression: 'set #title = :t',
      ExpressionAttributeValues: {
        ':t': updatedTopic.title
      },
      ExpressionAttributeNames: {
        '#title': 'title'
      },
      ReturnValues:"UPDATED_NEW"
    }).promise();

    return updatedTopicRes
  }
}
