import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRESQL_HOST || "127.0.0.1",
    port: process.env.POSTGRESQL_PORT ? parseInt(process.env.POSTGRESQL_PORT) : 5432,
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "ecommerce",
    synchronize: false,
    logging: true,
    // migrationsRun: true,
    entities: ['./dist/**/**.entity{.ts,.js}'],
    migrations: ['./dist/migrations/*.js'],
    migrationsTableName: "migrations"
    
};

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions);

export default dataSource;

  