import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)
import { createLogger } from '../utils/logger'
const logger = createLogger('ImagesS3')

export class S3Files {
  constructor(
    private readonly imagesS3Bucket = process.env.IMAGES_S3_BUCKET,
    private readonly thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET,
    private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' })
  ) {}

  generateUploadURL(userId: string, expires: string) {
    const imgObj = { Bucket: this.imagesS3Bucket, Key: userId, Expires: parseInt(expires, 10) }
    logger.info('generateURL', {imgObj})
    return this.s3.getSignedUrl('putObject', imgObj)
  }

  async getObjFromImages(key: string) {
    logger.info('getObj', {key})

    const response = await this.s3
    .getObject({
      Bucket: this.imagesS3Bucket,
      Key: key,
    })
    .promise();

    return response.Body
  }

  async putObjIntoThumbnailsBucket(key: string, convertedBuffer) {
    logger.info('putObj', {key})
    await this.s3.putObject({
      Bucket: this.thumbnailBucketName,
      Key: key,
      Body: convertedBuffer,
    })
    .promise();
  }
}
