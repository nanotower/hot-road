import { NewTopicRequest } from "../interfaces/NewTopicRequest";
import * as uuid from 'uuid'

import { TopicsData } from "../dataLayer/TopicsData";
const topicData = new TopicsData()

import { createLogger } from '../utils/logger'
const logger = createLogger('Topics-Logic')

export const createNewTopic = async (newTopicRequest: NewTopicRequest, userId: string) => {
    logger.info('Create New Topic', {newTopicRequest, userId})
    
    const createdAt = new Date().toISOString();
    const topicId = uuid.v4()
    
    const newTopic = {
        ...newTopicRequest,
        userId,
        topicId,
        createdAt,
        comments: 0
    }
    logger.info('NewTopic', {newTopic})
    return await topicData.createNewTopic(newTopic)
}

export const deleteTopic = async (topicId: string) => {
    logger.info('Delete Topic', {topicId}) 
    await topicData.deleteTopic(topicId)
    return {}
}

export const adjustTopicComment = async (topicId: string, operation: string) => {
    logger.info('adjust Topic Comment', {topicId})

    const adjustedTopicComment = await topicData.adjustTopicComment(topicId, operation)
    return adjustedTopicComment
}