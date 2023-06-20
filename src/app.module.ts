import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs
import { TypeOrmService } from '@Configs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: TypeOrmService,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
