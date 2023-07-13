import { CoachEntity } from "@Entites/coach.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoachDTO } from "./dto";

@Injectable()
export class CoachService{
    constructor(@InjectRepository(CoachEntity) private coachRepo: Repository<CoachEntity>){}

    create(coachdto: CoachDTO){
        return 'add coach to db'
    }

    findAll(){
        return 'return list of coach'
    }

    findOne(id: string){
        return 'return a coach'
    }
}