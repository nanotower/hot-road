import DbClient from './DbClient';

import { createLogger } from '../utils/logger';
const logger = createLogger('Topics-Data');

export class WsConnections extends DbClient {
  constructor(
    private readonly connectionsTable = process.env.CONNECTIONS_TABLE
  ) {
    super();
  }

  async getConnections() {
    logger.info('getConnections');

    const connections = await this.docClient
      .scan({
        TableName: this.connectionsTable,
      })
      .promise();

    return connections.Items;
  }

  async getConnection(userId: string) {
    logger.info('Processing S3 item with key', { userId });

    const connection = await this.docClient
      .get({
        TableName: this.connectionsTable,
        Key: {id:userId}
      })
      .promise();

    return connection.Item;
  }

  async deleteConnection(connectionId: string) {
    logger.info('Deleting connection key', { connectionId })
    
    await this.docClient
      .delete({
        TableName: this.connectionsTable,
        Key: {
          id: connectionId,
        },
      })
      .promise()
  }

  async saveConnection(item: object) {
    logger.info('Saving connection key', { item })

    await this.docClient.put({
      TableName: this.connectionsTable,
      Item: item
    }).promise()
  }
}
