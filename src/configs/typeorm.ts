import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

// Constants
import { POSTGRESQL_DATABASE, POSTGRESQL_HOST, POSTGRESQL_PASSWORD, POSTGRESQL_PORT, POSTGRESQL_USERNAME } from "@Constants/index";


@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: "postgres",
      host: POSTGRESQL_HOST,
      port: POSTGRESQL_PORT ? parseInt(process.env.POSTGRESQL_PORT) : 5432,
      username: POSTGRESQL_USERNAME,
      password: POSTGRESQL_PASSWORD,
      database: POSTGRESQL_DATABASE,
      synchronize: false,
      logging: true,
      migrationsRun: true,
      entities: ['./dist/**/**.entity{.ts,.js}'],
      subscribers: ["./dist/**/**.subscriber{.ts,.js}"],
      migrations: ['./dist/src/migrations/*.js'],
    };
  }
}
