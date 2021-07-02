import { S3Connections } from '../dataLayer/s3Connections';
import ApiGatewayWs from '../WSLayer/ApiGatewayWs';

const s3Connections = new S3Connections();
const apiGatewayWs = new ApiGatewayWs();

import { createLogger } from '../utils/logger';
const logger = createLogger('WSConnections');

export const saveConnection = async (item: object) => {
  logger.info('saving connection', { item });
  await s3Connections.saveConnection(item);
};

export const deleteConnection = async (connectionId) => {
  logger.info('deleting connection', { connectionId });
  await s3Connections.deleteConnection(connectionId.id);
};


export const getUsersConnected = async () => {
  logger.info('Getting all users connected');

  const connections = await s3Connections.getConnections();
  logger.info('connections', { connections });

  return connections;
};

export const sendMessageToClients = async (connections, payload) => {
  const postCalls = connections.map(async ({ id }) => {
    try {
      logger.info('Sending message to a connection', { id });
      await apiGatewayWs.postToConnection(id, payload);
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${id}`);
        await s3Connections.deleteConnection(id);
      } else {
        throw e;
      }
    }
  });

  try {
    logger.info('postCalls');
    await Promise.all(postCalls);
  } catch (e) {
    logger.error({e});
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };

  // try {
  //   await message.sendMessageToClient(connectionId, payload)
  // } catch (e) {
  //   logger.error('Failed to send message', {e})
  //   if (e.statusCode === 410) {
  //     logger.error('Stale connection')
  //     await s3Connections.deleteConnection(connectionId)
  //   }
  // }
};
