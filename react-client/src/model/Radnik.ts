export class Radnik {
  radnikID: number;

  imePrezime: string;

  brRadneKnjizice: string;

  constructor(radnikID: number, imePrezime: string, brRadneKnjizice: string) {
    this.radnikID = radnikID;
    this.imePrezime = imePrezime;
    this.brRadneKnjizice = brRadneKnjizice;
  }
}
