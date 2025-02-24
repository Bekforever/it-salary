import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'new_db',
  password: '1302',
  port: 5432, // убедитесь, что порт соответствует вашему PostgreSQL
})

export const db = drizzle(pool)
