import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Configs
import { dataSourceOptions } from '@Configs/index';

// Modules
import { SampleModule } from './modules';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
