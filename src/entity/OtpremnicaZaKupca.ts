
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { FakturaZaKupca } from "./FakturaZaKupca";
@Entity()
export class OtpremnicaZaKupca {

    @PrimaryGeneratedColumn()
    otpremnicaZaDobavljacaId: number;

    @Column()
    izdao: string;

    @OneToMany(type => FakturaZaKupca, faktura => faktura.radnik)
    fakture: FakturaZaKupca[];
}


