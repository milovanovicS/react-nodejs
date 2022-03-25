export class Kupac {
  kupacID: number;

  nazivKupca: string;

  adresa: string;

  grad: string;

  constructor(kupacID: number, naziv: string, adresa: string, grad: string) {
    this.kupacID = kupacID;
    this.nazivKupca = naziv;
    this.adresa = adresa;
    this.grad = grad;
  }
}
