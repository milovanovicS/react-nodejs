import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { FakturaZaKupca } from "./FakturaZaKupca";
import { PotvrdaOPlacanjuKupca } from "./PotvrdaOPlacanjuKupca";

@Entity()
export class Kupac {

    @PrimaryGeneratedColumn()
    kupacid: number;

    @Column()
    naziv: string;

    @Column()
    adresa: string;

    @Column()
    grad: string;

    @OneToMany(type => FakturaZaKupca, faktura => faktura.kupac)
    fakture: FakturaZaKupca[];

    @OneToMany(type => PotvrdaOPlacanjuKupca, potvrda => potvrda.kupac)
    potvrde: PotvrdaOPlacanjuKupca[];
}
