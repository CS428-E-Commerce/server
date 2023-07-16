import { CoachEntity } from "src/entities/coach.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoachDTO } from "./dto";
import { UserEntity } from "src/entities/user.entity";
import { COACH } from "@Constants/index.ts";

@Injectable()
export class CoachService{
    constructor(@InjectRepository(CoachEntity) private coachRepo: Repository<CoachEntity>,
                @InjectRepository(UserEntity) private coachAcco: Repository<UserEntity>){}

    create(coachdto: CoachDTO){
        const newCoachAcco = this.coachAcco.create({
            email: coachdto.email,
            password: coachdto.password,
            phone: coachdto.phone,
            username: coachdto.username,
            address: coachdto.address,
            description: coachdto.description,
            avatar: coachdto.avatar,
            role: COACH
        });
        const newCoachRepo = this.coachRepo.create({
            
        });
        return [this.coachRepo.save(newCoachRepo), this.coachAcco.save(newCoachAcco)];
    }

    findAll(){
        // return this.coachRepo.find()
    }

    findOne(id: string){
        // return this.coachRepo.findOneBy({ coachID:id });
    }

    findOneWithLogin(username: string, pwd: string){
        // return this.coachAcco.findOneBy()
    }
}