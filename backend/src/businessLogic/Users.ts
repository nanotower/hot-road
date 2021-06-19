import { UsersData } from '../dataLayer/UsersData';

const usersData = new UsersData();

import { NewUserRequest } from '../interfaces/NewUserRequest';
import { createLogger } from '../utils/logger'
const logger = createLogger('UsersLogic')

export const getUser = async (userId: string) => {
  const user = await usersData.getUser(userId);
  logger.info('Get user', {userId, user});
  return !!user && user;
};

export const registerUser = async (
  userId: string,
  newUserRequest: NewUserRequest
) => {
  logger.info('register User', {userId, newUserRequest})
  const createdAt = new Date().toISOString();
  const topics = 0;
  
  const user = {
    userId,
    ...newUserRequest,
    topics,
    createdAt,
  };
  logger.info('User', {user})
  const userCreated = await usersData.registerUser(user);
  return userCreated;
};
