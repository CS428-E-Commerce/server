import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs
import { ConfigModule } from '@nestjs/config';

// Modules
import { SampleModule } from './modules';
import { dataSourceOptions } from '@Configs/index';
import { CourseModule } from './modules/course-module/course.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        SampleModule,
        CourseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
