

import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { StavkaFaktureZaKupca } from "./StavkaFaktureZaKupca";

@Entity()
export class Proizvod {

    @PrimaryGeneratedColumn()
    proizvodID: number;

    @Column()
    nazivProizvoda: string;

    @Column()
    tipProizvdodaID: number;

    @OneToMany(type => StavkaFaktureZaKupca, stavka => stavka.proizvod)
    stavke: StavkaFaktureZaKupca[];
}
