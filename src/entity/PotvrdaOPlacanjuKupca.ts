import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Radnik } from "./Radnik";
import { Kupac } from "./Kupac";
import { FakturaZaKupca } from "./FakturaZaKupca";


@Entity()
export class PotvrdaOPlacanjuKupca {

    @PrimaryGeneratedColumn()
    potvrdaID: number;

    @Column()
    potvrduPotpisao: string;

    @Column()
    stanje: string;

    @Column()
    datumPotvrde: string;

    @ManyToOne(type => Radnik, radnik => radnik.potvrde, {eager: true})
    radnik: Radnik;

    @ManyToOne(type => Kupac, kupac => kupac.potvrde, {eager: true})
    kupac: Kupac;

    @ManyToOne(type => FakturaZaKupca, faktura => faktura.potvrde, {eager: true})
    faktura: FakturaZaKupca;
}


