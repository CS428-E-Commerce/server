import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Configs
import { dataSourceOptions } from '@Configs/index.ts';

// Modules
import {  UserModule } from './modules';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './modules/course-module/course.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        AuthModule,
        UserModule,
        CourseModule,
        // CoachModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
