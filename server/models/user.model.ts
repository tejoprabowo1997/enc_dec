import { Model, Schema, model } from 'mongoose'
import { IMethods, ISchema } from '../../types/model/IUser'
import { useCrypto } from '../../composables/useCrypto'

class UserModel implements IMethods {
  private readonly model: Model<ISchema>

  constructor() {
    const userModelSchema = new Schema<ISchema>(
      {
        name: {
          type: String,
          required: true,
        },
        nik: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        role: {
          type: String,
          required: true,
          default: 'user',
        },
        password: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        picture: {
          type: String,
          required: true,
          default:
            'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg',
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      }
    )

    userModelSchema.pre<ISchema>('save', async function (next) {
      const crypto = useCrypto()

      const hashedName = crypto.encrypt(this.name, 'secret', 'AES')
      const hashedNik = crypto.encrypt(this.nik, 'secret', 'AES')
      const hashedEmail = crypto.encrypt(this.email, 'secret', 'AES')
      const hashedRole = crypto.encrypt(this.role, 'secret', 'AES')
      const hashedPassword = crypto.encrypt(this.password, 'secret', 'AES')
      const hashedPhoneNumber = crypto.encrypt(this.phoneNumber, 'secret', 'AES')
      const hashedPicture = crypto.encrypt(this.picture, 'secret', 'AES')

      this.name = hashedName
      this.nik = hashedNik
      this.email = hashedEmail
      this.role = hashedRole
      this.phoneNumber = hashedPhoneNumber
      this.password = hashedPassword
      this.picture = hashedPicture

      next()
    })

    this.model = model<ISchema>('User', userModelSchema)
  }

  async createUser(data: {
    name: string
    nik: string
    email: string
    role?: 'user' | 'admin'
    password: string
    phoneNumber: string
    picture?: string
  }): Promise<{ success: boolean; message?: string; count?: number; pageLength?: number }> {
    try {
      const user = await this.model.create(data)
      if (!user) {
        return {
          success: false,
          message: 'Failed to create user',
        }
      }
      return {
        success: true,
        message: 'Success to create user',
      }
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  }

  async getAllUser(): Promise<{ success: boolean; message?: string; result: ISchema[] }> {
    try {
      const users = await this.model.find()
      if (!users) {
        return {
          success: false,
          message: 'Failed to get all user',
          result: [],
        }
      }

      const modifiedUsers = users.map((user) => ({
        _id: user._id,
        name: useCrypto().decrypt(user.name, 'secret', 'AES'),
        nik: useCrypto().decrypt(user.nik, 'secret', 'AES'),
        email: useCrypto().decrypt(user.email, 'secret', 'AES'),
        role: useCrypto().decrypt(user.role, 'secret', 'AES'),
        password: useCrypto().decrypt(user.password, 'secret', 'AES'),
        phoneNumber: useCrypto().decrypt(user.phoneNumber, 'secret', 'AES'),
        picture: useCrypto().decrypt(user.picture, 'secret', 'AES'),
      }))

      return {
        success: true,
        result: modifiedUsers,
      }
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as Error).message,
        result: [],
      }
    }
  }
}

export default new UserModel()
