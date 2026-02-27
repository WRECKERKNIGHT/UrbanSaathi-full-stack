import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

function parseUrl(connectionUrl: string): Partial<TypeOrmModuleOptions> {
  if (!connectionUrl) {
    return {};
  }
  const url = new URL(connectionUrl);
  return {
    host: url.hostname,
    port: parseInt(url.port, 10),
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    ssl: true,
  };
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...parseUrl(process.env.DATABASE_URL || ''),
  host: process.env.DB_HOST || process.env.DATABASE_URL ? undefined : 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : process.env.DATABASE_URL ? undefined : 5432,
  username: process.env.DB_USERNAME || process.env.DATABASE_URL ? undefined : 'postgres',
  password: process.env.DB_PASSWORD || process.env.DATABASE_URL ? undefined : 'postgres',
  database: process.env.DB_NAME || process.env.DATABASE_URL ? undefined : 'urbansaathi',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.NODE_ENV !== 'production',
};

export const typeOrmDataSource = new DataSource({
  type: 'postgres',
  ...parseUrl(process.env.DATABASE_URL || ''),
  host: process.env.DB_HOST || process.env.DATABASE_URL ? undefined : 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : process.env.DATABASE_URL ? undefined : 5432,
  username: process.env.DB_USERNAME || process.env.DATABASE_URL ? undefined : 'postgres',
  password: process.env.DB_PASSWORD || process.env.DATABASE_URL ? undefined : 'postgres',
  database: process.env.DB_NAME || process.env.DATABASE_URL ? undefined : 'urbansaathi',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: process.env.NODE_ENV !== 'production',
});
