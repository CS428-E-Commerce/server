import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME } from "@Constants/index.ts";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: POSTGRES_HOST || "db",
    port: POSTGRES_PORT ? parseInt(process.env.POSTGRESQL_PORT) : 5432,
    username: POSTGRES_USERNAME || "postgres",
    password: POSTGRES_PASSWORD || "postgres",
    database: POSTGRES_DB || "ecommerce",
    synchronize: false,
    logging: true,
    entities: ['./dist/**/**.entity{.ts,.js}'],
    migrations: ['./dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

  