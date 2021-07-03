import { WsConnections } from '../dataLayer/WsConnections';
import ApiGatewayWs from '../WSLayer/ApiGatewayWs';

const wsConnections = new WsConnections();
const apiGatewayWs = new ApiGatewayWs();

import { createLogger } from '../utils/logger';
const logger = createLogger('WSConnections-logic');

export const saveConnection = async (item: object) => {
  logger.info('saving connection', { item });
  await wsConnections.saveConnection(item);
};

export const deleteConnection = async (connectionId) => {
  logger.info('deleting connection', { connectionId });
  await wsConnections.deleteConnection(connectionId.id);
};


export const getUsersConnected = async () => {
  logger.info('Getting all users connected');

  const connections = await wsConnections.getConnections();
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
        logger.warning(`Found stale connection, deleting ${id}`);
        await wsConnections.deleteConnection(id);
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
};
