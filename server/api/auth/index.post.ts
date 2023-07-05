import UserModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const users = await UserModel.getAllUser()

  const findUser =
    users.result.find((user) => user.email === body.nikOrEmail) ||
    users.result.find((user) => user.nik === body.nikOrEmail)

  if (!findUser) {
    return {
      success: false,
      message: 'User not found',
    }
  }

  if (findUser.password !== body.password) {
    return {
      success: false,
      message: 'Incorrect password',
    }
  }

  return {
    success: true,
    message: 'Success to login',
    result: findUser,
  }
})
