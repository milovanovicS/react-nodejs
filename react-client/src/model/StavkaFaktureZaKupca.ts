export class StavkaFaktureZaKupca {
    stavkaID: number;
  
    kolicina: number;
  
    rabat: number;
  
    cenaStavke: number;
  
    proizvodID: number;
  
    fakturaID: number;
  
    constructor(
    stavkaID: number,
    rabat: number,
    kolicina: number,
    cenaStavke: number,
    proizvodID: number,
    fakturaID: number
    ) {
      this.stavkaID = stavkaID;
      this.rabat = rabat;
      this.kolicina= kolicina;
      this.cenaStavke = cenaStavke;
      this.proizvodID = proizvodID;
      this.fakturaID = fakturaID;
    }
  }
  