import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).hostname
    : process.env.DB_HOST || 'localhost',
  port: process.env.DATABASE_URL
    ? parseInt(new URL(process.env.DATABASE_URL).port, 10)
    : process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).username
    : process.env.DB_USERNAME || 'postgres',
  password: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).password
    : process.env.DB_PASSWORD || 'postgres',
  database: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).pathname.substring(1)
    : process.env.DB_NAME || 'urbansaathi',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.NODE_ENV !== 'production',
};
