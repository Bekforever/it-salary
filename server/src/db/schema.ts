import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import dotenv from 'dotenv'
import './city.model'
import './user.model'
import './position.model'
import './company.model'
import './location.model'
import './experience.model'

dotenv.config()

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL!,
  user: process.env.DB_USER!,
  host: process.env.DB_HOST!,
  database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
  port: +process.env.DB_PORT!,
  ssl: false,
})
const db = drizzle({ client: pool })

export default db
