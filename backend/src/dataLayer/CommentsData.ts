import DbClient from './DbClient';
import { CommentItem } from '../interfaces/CommentItem';
import { createLogger } from '../utils/logger';
const logger = createLogger('comments-Data');

export class CommentsData extends DbClient {
  constructor(private readonly commentsTable = process.env.COMMENTS_TABLE) {
    super();
  }
  async createNewComment(comment: CommentItem): Promise<CommentItem> {
    logger.info('create New Comment', comment)

    await this.docClient
      .put({
        TableName: this.commentsTable,
        Item: {
          ...comment,
        },
      })
      .promise();

    return comment;
  }
}
