export class PotvrdaOPlacanjuKupca {
  potvrdaID: number;

  potvrduPotpisao: string;

  datumPotvrde: string;

  stanje: string;

  kupacID: number;

  radnikID: number;

  fakturaID: number;

  constructor(
    potvrdaID: number,
    potvrduPotpisao: string,
    datumPotvrde: string,
    stanje: string,
    kupacID: number,
    radnikID: number,
    fakturaID: number
  ) {
    this.potvrdaID = potvrdaID;
    this.potvrduPotpisao = potvrduPotpisao;
    this.datumPotvrde = datumPotvrde;
    this.kupacID = kupacID;
    this.radnikID = radnikID;
    this.fakturaID = fakturaID;
    this.stanje=stanje;
  }
}
