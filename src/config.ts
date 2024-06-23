import { IConfig } from './types/config'

const config: IConfig = {
  port: '4000',
  mongo_db_user: process.env.MONGO_DB_USER ?? '',
  mongo_db_password: process.env.MONGO_DB_PASSWORD ?? '',
  mongo_db_cluster: process.env.MONGO_DB_CLUSTER ?? ''
}

export default config
