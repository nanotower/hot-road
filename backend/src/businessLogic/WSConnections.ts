import { S3Connections } from "../dataLayer/s3Connections"
import ApiGatewayWs from '../WSLayer/ApiGatewayWs' 

const s3Connections = new S3Connections
const apiGatewayWs = new ApiGatewayWs

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

export const sendMessageToClient = async (sendTo: string, message: string) => {
    logger.info('sending message', {sendTo, message})
    await apiGatewayWs.postToConnection(sendTo, message)
}