import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'certificate'})
export class CertificateEntity {
    @PrimaryColumn('varchar', { nullable: false })    
    CoachID: string;

    @PrimaryColumn('varchar', { nullable: false })
    certificate: string;
}