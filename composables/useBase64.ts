export const useToBase64 = (data: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert data to base64'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read data'))
    }

    reader.readAsDataURL(data)
  })
}
