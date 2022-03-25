import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { FakturaZaKupca } from "./FakturaZaKupca";
import { PotvrdaOPlacanjuKupca } from "./PotvrdaOPlacanjuKupca";

@Entity()
export class Radnik {

    @PrimaryGeneratedColumn()
    radnikId: number;

    @Column()
    imePrezime: string;

    @Column()
    brojRadneKnjizice: string;

    @OneToMany(type => FakturaZaKupca, faktura => faktura.radnik)
    fakture: FakturaZaKupca[];

    @OneToMany(type => PotvrdaOPlacanjuKupca, potvrda => potvrda.radnik)
    potvrde: PotvrdaOPlacanjuKupca[];
}
