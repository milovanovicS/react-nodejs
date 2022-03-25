import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";
import { Radnik } from "./Radnik";
import { OtpremnicaZaDobavljaca } from "./OtpremnicaZaKupca";
import { Dobavljac } from "./Dobavljac";
import { FakturaZaKupca } from "./FakturaZaKupca";

@Entity()
export class PrijemnicaZaDobavljaca {

    @PrimaryGeneratedColumn()
    prijemnicaZaDobavljacaId: number;

    @Column()
    datumPrijema: Date;

    @Column()
    napomena: string;

    @Column()
    odgovornoLice: string;

    @OneToOne(type => OtpremnicaZaDobavljaca, {eager: true})
    @JoinColumn()
    otpremnica: OtpremnicaZaDobavljaca;

    @ManyToOne(type => Dobavljac, dobavljac => dobavljac.prijemnice, {eager: true})
    dobavljac: Dobavljac;

    @OneToMany(type => FakturaZaKupca, reklamacija => reklamacija.prijemnica)
    reklamacije: FakturaZaKupca[];
}


