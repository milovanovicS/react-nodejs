export class FakturaZaKupca {
  fakturaID: number;

  rokPlacanja: string;

  napomena: string;

  ukupanaCena: number;

  stanje: string;

  kupacID: number;

  radnikID: number;

  otpremnicaID: number;

  constructor(
    fakturaID: number,
    rokPlacanja: string,
    napomena: string,
    ukupanaCena: number,
    stanje: string,
    kupacID: number,
    radnikID: number,
    otpremnicaID: number
  ) {
    this.fakturaID = fakturaID;
    this.rokPlacanja = rokPlacanja;
    this.napomena = napomena;
    this.ukupanaCena = ukupanaCena;
    this.stanje = stanje;
    this.kupacID = kupacID;
    this.radnikID = radnikID;
    this.otpremnicaID = otpremnicaID;
  }
}
