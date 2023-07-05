import { connect } from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const uri = config.mongooDbUri
  const dbName = config.dbName

  async function main() {
    await connect(uri, {
      dbName,
    })
  }

  main()
    .catch((err) => console.log(err))
    .then(() => console.log('Database connected'))
})
