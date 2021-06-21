import { UsersData } from '../dataLayer/UsersData'

const usersData = new UsersData()

import { NewUserRequest } from '../interfaces/NewUserRequest'
import { createLogger } from '../utils/logger'
const logger = createLogger('UsersLogic')

import {S3Files} from '../dataLayer/S3Files'
const s3Files = new S3Files()

export const getUser = async (userId: string) => {
  const user = await usersData.getUser(userId)
  logger.info('Get user', {userId, user})
  return !!user && user
};

export const registerUser = async (
  userId: string,
  newUserRequest: NewUserRequest
) => {
  logger.info('register User', {userId, newUserRequest})
  const createdAt = new Date().toISOString()
  const topics = 0
  
  const user = {
    userId,
    ...newUserRequest,
    topics,
    createdAt
  }
  logger.info('User', {user})
  const userCreated = await usersData.registerUser(user)
  return userCreated
};

export const adjustUsersTopic = async (userId: string, operation: string) => {
  logger.info('Event', {userId})
  const updatedUser = await usersData.adjustUsersTopic(userId, operation)
  return updatedUser
}

export async function generateUrl(userId: string): Promise<string> {
  logger.info('generate URL ', {userId})
  const urlExpires = process.env.URL_EXPIRES

  const urlSigned = s3Files.generateUploadURL(userId, urlExpires)
  return urlSigned
}
