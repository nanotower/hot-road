import { S3Connections } from "../dataLayer/s3Connections"

const s3Connections = new S3Connections

import { createLogger } from '../utils/logger'
const logger = createLogger('WSConnections')

export const saveConnection = async (item: object) => {
    logger.info('saving connection', {item})
    await s3Connections.saveConnection(item)
}

export const deleteConnection = async (connectionId) => {
    logger.info('deleting connection', {connectionId})
    await s3Connections.deleteConnection(connectionId.id)
}