import { S3EventRecord, S3Event } from 'aws-lambda';
import Jimp from 'jimp/es';
import { S3Files } from '../dataLayer/S3Files';
import { S3Connections } from '../dataLayer/s3Connections';
import { Message } from '../messagesLayer/Message'

const s3Files = new S3Files();
const s3Connections = new S3Connections();
const message = new Message()

import { createLogger } from '../utils/logger';
const logger = createLogger('s3Files-Logic');

export const processImage = async (record: S3EventRecord) => {
  const key = record.s3.object.key;
  logger.info('Processing S3 item with key', { key });
  const response = await s3Files.getObjFromImages(key);
  // @ts-ignore
  const image = await Jimp.read(response);

  logger.info('Resizing image');
  image.resize(150, Jimp.AUTO);
  // @ts-ignore
  const convertedBuffer = await image.getBufferAsync(Jimp.AUTO);

  logger.info('Writing image back to S3 bucket');

  await s3Files.putObjIntoThumbnailsBucket(`${key}.jpeg`, convertedBuffer);
};

export const processS3Event = async (s3Event: S3Event) => {
  for (const record of s3Event.Records) {
    const key = record.s3.object.key;
    const userId = key.split('.')[0]
    logger.info('Processing S3 event with key', { key, userId });

    const connection = await s3Connections.getConnection(userId)
    logger.info('connection', { connection })

    const payload = {
      userId: key,
    };

    if (userId.length)

    for (const connection of connections.Items) {
      const connectionId = connection.id
      await sendMessageToClient(connectionId, payload)
    }
  }
}

const sendMessageToClient = async (connectionId, payload) => {
  try {
    logger.info('Sending message to a connection', {connectionId})
    await message.sendMessageToClient(connectionId, payload)
  } catch (e) {
    logger.error('Failed to send message', {e})
    if (e.statusCode === 410) {
      logger.error('Stale connection')
      await s3Connections.deleteConnection(connectionId)
    }
  }
}
