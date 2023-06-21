import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

// Constants
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME } from "@Constants/index";


@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: "postgres",
      host: POSTGRES_HOST || "db",
      port: POSTGRES_PORT ? parseInt(process.env.POSTGRESQL_PORT) : 5432,
      username: POSTGRES_USERNAME || "postgres",
      password: POSTGRES_PASSWORD || "postgres",
      database: POSTGRES_DB || "ecommerce",
      synchronize: false,
      logging: true,
      migrationsRun: true,
      entities: ['./dist/**/**.entity{.ts,.js}'],
      subscribers: ["./dist/**/**.subscriber{.ts,.js}"],
      migrations: ['./dist/src/migrations/*.js'],
    };
  }
}
