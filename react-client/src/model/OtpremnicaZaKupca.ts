export class OtpremnicaZaKupca {
    otpremnicaID: number;
  
    datumOtpremanja: string;
  
    otpremnicuPrimio: string;
  
    stanje: string;
  
    kupacID: number;
  
    radnikID: number;

  
    constructor(
    otpremnicaID: number,
      datumOtpremanja: string,
      otpremnicuPrimio: string,
      stanje: string,
      kupacID: number,
      radnikID: number
      
    ) {
        this.otpremnicaID = otpremnicaID;
      this.datumOtpremanja = datumOtpremanja;
      this.otpremnicuPrimio = otpremnicuPrimio;
      this.stanje = stanje;
      this.kupacID = kupacID;
      this.radnikID = radnikID;
      
    }
  }
  