import { CoachEntity } from "@Entites/coach.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoachDTO } from "./dto";
import { UserEntity } from "@Entites/user.entity";

@Injectable()
export class CoachService{
    constructor(@InjectRepository(CoachEntity) private coachRepo: Repository<CoachEntity>,
                @InjectRepository(UserEntity) private coachAcco: Repository<UserEntity>){}

    create(coachdto: CoachDTO){
        const newCoachRepo = this.coachRepo.create(coachdto);
        const newCoachAcco = this.coachAcco.create(coachdto);
        return [this.coachRepo.save(newCoachRepo), this.coachAcco.save(newCoachAcco)];
    }

    findAll(){
        return this.coachRepo.find()
    }

    findOne(id: string){
        return this.coachRepo.findOneBy({ coachID:id });
    }
}