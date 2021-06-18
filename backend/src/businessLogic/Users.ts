import { UsersData } from '../dataLayer/UsersData';

const usersData = new UsersData();
// import { UserItem } from '../interfaces/UserItem'
import { NewUserRequest } from '../interfaces/NewUserRequest'

export const getUser = async (userId: string) => {
  const user = await usersData.getUser(userId)

  console.log('Get user: ', user);

  return !!user && user
}

export const registerUser = async (userId: string, newUserRequest: NewUserRequest) => {
    const createdAt = new Date().toISOString()
    const topics = 0

    const user = {
        userId,
        ...newUserRequest,
        topics,
        createdAt,
    }
    const userCreated = await usersData.registerUser(user)
    return userCreated