import { NewTopicRequest } from "../interfaces/NewTopicRequest";
import * as uuid from 'uuid'

import { TopicsData } from "../dataLayer/TopicsData";
const topicData = new TopicsData()

import { createLogger } from '../utils/logger'
const logger = createLogger('TopicsLogic')

export const createNewTopic = async (newTopicRequest: NewTopicRequest, userId: string) => {
    logger.info('Event', {newTopicRequest, userId})
    
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