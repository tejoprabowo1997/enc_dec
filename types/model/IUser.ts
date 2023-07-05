export interface ISchema {
  name: string
  nik: string
  email: string
  role?: 'user' | 'admin'
  password: string
  phoneNumber: string
  picture?:
    | string
    | 'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'
}

export interface IMethods {
  createUser(data: {
    name: string
    nik: string
    email: string
    role?: 'user' | 'admin'
    password: string
    phoneNumber: string
    picture?: string
  }): Promise<{ success: boolean; message?: string; count?: number; pageLength?: number }>
  getAllUser(): Promise<{ success: boolean; message?: string; result: ISchema[] }>
}
