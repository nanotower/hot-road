import { S3EventRecord } from 'aws-lambda';
import Jimp from 'jimp/es';
import { S3Files } from '../dataLayer/S3Files';

const s3Files = new S3Files();


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
