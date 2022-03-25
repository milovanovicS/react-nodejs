export class Proizvod {
    proizvodID: number;
  
    nazivProizvoda: string;
  
    tipProizvdodaID: number;

    constructor(proizvodID: number, nazivProizvoda: string, tipProizvdodaID: number) {
      this.proizvodID = proizvodID;
      this.nazivProizvoda = nazivProizvoda;
      this.tipProizvdodaID = tipProizvdodaID;
    }
  }
  