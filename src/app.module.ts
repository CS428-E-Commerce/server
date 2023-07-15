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
import { CoachModule } from './modules/coach-module/coach.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        SampleModule,
        CourseModule,
        CoachModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
