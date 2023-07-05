import UserModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
  const data = await readBody(event)

  return await UserModel.createUser(data)
})
