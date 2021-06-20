import DbClient from './DbClient'
import { CommentItem } from '../interfaces/CommentItem'
import { createLogger } from '../utils/logger'
const logger = createLogger('comments-Data')

export class CommentsData extends DbClient {
  constructor(
    private readonly commentsTable = process.env.COMMENTS_TABLE,
    private readonly topicIndex = process.env.TOPIC_ID_INDEX
  ) {
    super()
  }
  async createNewComment(comment: CommentItem): Promise<CommentItem> {
    logger.info('create New Comment', comment)

    await this.docClient
      .put({
        TableName: this.commentsTable,
        Item: {
          ...comment,
        }
      })
      .promise()

    return comment
  }
  // Promise<CommentItem[]>
  async getCommentsFromTopic(topicId: string): Promise<CommentItem[]> {
    logger.info('get Comments from topic', { topicId })

    const comments = await this.docClient
      .query({
        TableName: this.commentsTable,
        IndexName: this.topicIndex,
        KeyConditionExpression: 'topicId = :topicId',
        ExpressionAttributeValues: {
          ':topicId': topicId,
        },
      })
      .promise();
    return comments.Items as CommentItem[]
  }
}
