import cryptoJS from 'crypto-js'

export const useCrypto = () => {
  const config = useRuntimeConfig()

  const encrypt = (data: any, key: string, type: 'AES' | 'DES' | 'RC4') => {
    const jsonData = JSON.stringify(data)

    const options = {
      iv: cryptoJS.enc.Utf8.parse(config.cryptoIV),
      mode: cryptoJS.mode.CBC,
      padding: cryptoJS.pad.Pkcs7,
    }

    return cryptoJS[type].encrypt(jsonData, key, options).toString()
  }

  const decrypt = (encryptedData: any, key: string, type: 'AES' | 'DES' | 'RC4') => {
    try {
      const options = {
        iv: cryptoJS.enc.Utf8.parse(config.cryptoIV),
        mode: cryptoJS.mode.CBC,
        padding: cryptoJS.pad.Pkcs7,
      }

      const decrypted = cryptoJS[type].decrypt(encryptedData, key, options)
      const decryptedJson = decrypted.toString(cryptoJS.enc.Utf8)

      return JSON.parse(decryptedJson)
    } catch (error) {
      console.log('Decryption error:', error)
    }
  }

  return { encrypt, decrypt }
}
