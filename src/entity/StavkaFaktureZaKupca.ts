import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Proizvod } from "./Proizvod";
import { FakturaZaKupca } from "./FakturaZaKupca";

@Entity()
export class StavkaFaktureZaKupca {

    @PrimaryGeneratedColumn()
    internoPraviloId: number;

    @Column()
    nazivPravila: string;

    @Column()
    datumUnosa: Date;

    @Column()
    opisPravila: string;

    //moze i {lazy: true} onda je radnik.sektor promise
    //ako se ne stavi nista, mora u find-u za radnike da se stavi {relations: ["sektor"]}
    @OneToMany(type => Proizvod, proizvod => proizvod.stavke, {eager: true})
    proizvod: Proizvod;

    @OneToMany(type => FakturaZaKupca, reklamacija => reklamacija.stavka)
    fakture: FakturaZaKupca[];

}


