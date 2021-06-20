import * as uuid from 'uuid';

import { CommentItem } from '../interfaces/CommentItem'

import {CommentsData} from '../dataLayer/CommentsData'
const commentsData = new CommentsData


import { createLogger } from '../utils/logger'
const logger = createLogger('Comments-Logic')

export const createNewComment = async (userId: string, topicId: string, content: string, authorObj: object) => {
  logger.info('create Comment', {userId , topicId , content, authorObj})
  const createdAt: string = new Date().toISOString()
  const commentId: string = uuid.v4()
  const author: string = JSON.stringify(authorObj)

  const newComment = {
    topicId,
    userId,
    commentId,
    content,
    author,
    createdAt,
  };
  logger.info('new Comment', {newComment})

  const commentCreated = await commentsData.createNewComment(newComment)
  // const adjustedTopicComment = await topicsData.adjustTopicComment(topicId, 'addComment')

  logger.info('result', {commentCreated})

  return commentCreated
};

export const getCommentsFromTopic = async(topicId: string): Promise<CommentItem[]> => {
  logger.info('get Comments From Topic', {topicId})
  return await commentsData.getCommentsFromTopic(topicId)
}