import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Radnik } from "./Radnik";
import { Kupac } from "./Kupac";
import { StavkaFaktureZaKupca } from "./StavkaFaktureZaKupca";
import { PotvrdaOPlacanjuKupca } from "./PotvrdaOPlacanjuKupca";
import { OtpremnicaZaKupca } from "./OtpremnicaZaKupca";


@Entity()
export class FakturaZaKupca {

    @PrimaryGeneratedColumn()
    fakturaId: number;

    @Column()
    opis: string;

    @Column()
    napomena: string;

    @ManyToOne(type => Radnik, radnik => radnik.fakture, {eager: true})
    radnik: Radnik;

    @ManyToOne(type => Kupac, kupac => kupac.fakture, {eager: true})
    kupac: Kupac;

    @ManyToOne(type => OtpremnicaZaKupca, otpremnica => otpremnica.fakture, {eager: true})
    otpremnica: Radnik;

    @ManyToOne(type => StavkaFaktureZaKupca, StavkaFaktureZaKupca => StavkaFaktureZaKupca.fakture, {eager: true})
    stavka: StavkaFaktureZaKupca;

    @OneToMany(type => PotvrdaOPlacanjuKupca, potvrda => potvrda.faktura)
    potvrde: PotvrdaOPlacanjuKupca[];
}


