import { PotvrdaOPlacanjuKupca } from "../model/PotvrdaOPlacanjuKupca";

const baseUrl = "http://localhost:8080/SanjaFPIS";

export async function getAllPotvrde() {
  let res = await fetch(baseUrl + "/potvrda");
  let potvrde = await res.json();
  console.log(potvrde);
  return potvrde.map((pot: any) => ({
    ...pot,
    potvrduPotpisao: pot.potvrduPotpisao,
    datumPotvrde: pot.datumPotvrde,
    stanje:pot.stanje,
    kupacID: pot.kupac.kupacID,
    radnikID: pot.radnik.radnikID,
    fakturaID: pot.faktura.fakturaID
  }));
}

export async function getAllFakture() {
  let res = await fetch(baseUrl + "/faktura");
  let fakture = await res.json();
  return fakture.map((pot: any) => ({
    ...pot,
    radnikID: pot.radnik.radnikID,
    kupacID: pot.kupac.kupacID,
    otpremnicaID: pot.otp.otpremnicaID
  }));
}
export async function addPotvrda(potvrda: PotvrdaOPlacanjuKupca) {
  let { potvrdaID, ...pot } = potvrda;
  let res = await fetch(baseUrl + "/potvrda", {
    method: "POST",
    body: JSON.stringify(pot),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log(JSON.stringify(pot));
  let p = await res.json();
  return p;
}
export async function getAllRadnik() {
  let res = await fetch(baseUrl + "/radnik");
   console.log(res.json);
  return await res.json();
}
export async function getAllKupac() {
  let res = await fetch(baseUrl + "/kupac");
  console.log(res.json);
  return await res.json();
}
export async function updatePotvrda(potvrda: PotvrdaOPlacanjuKupca) {
  let { potvrdaID, ...pot } = potvrda;
  let res = await fetch(baseUrl + `/potvrda/${potvrdaID}`, {
    method: "PUT",
    body: JSON.stringify(pot),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log(JSON.stringify(pot));
  return await res.json();
}
export async function removePotvrda(potvrdaID: number) {
  await fetch(baseUrl + `/potvrda/${potvrdaID}`, {
    method: "DELETE"
  });
}
