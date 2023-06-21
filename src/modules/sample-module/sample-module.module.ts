import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller
import { SampleController } from "./sample-module.controller";

// Services
import { SampleService } from "./sample-module.service";




@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [SampleController],
    providers: [SampleService],
  })
export class SampleModule {}