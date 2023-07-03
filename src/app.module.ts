import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs
import { ConfigModule } from '@nestjs/config';

// Modules
import { SampleModule } from './modules';
import { dataSourceOptions } from '@Configs/index';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        SampleModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
