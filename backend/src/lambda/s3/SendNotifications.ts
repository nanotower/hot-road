import { SNSHandler, SNSEvent } from 'aws-lambda'
import 'source-map-support/register'
import { processS3Event } from '../../businessLogic/S3Files'
import { createLogger } from '../../utils/logger'
const logger = createLogger('sendNotificationsLambda')

export const handler: SNSHandler = async (event: SNSEvent) => {
  logger.info('Processing SNS event', event)
  for (const snsRecord of event.Records) {
    const s3EventStr = snsRecord.Sns.Message
    logger.info('Processing S3 event', s3EventStr)
    const s3Event = JSON.parse(s3EventStr)

    await processS3Event(s3Event)
  }
}
