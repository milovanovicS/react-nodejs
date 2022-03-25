import React, { Component } from "react";
import { Radnik } from "../model/Radnik";
import { FakturaZaKupca } from "../model/FakturaZaKupca";
import { OtpremnicaZaKupca } from "../model/OtpremnicaZaKupca";
import { Kupac } from "../model/Kupac";

interface State {
    izabranaFaktura: string;
    aktivan: string;
  }

  interface Props {
    fakture: FakturaZaKupca[];
    radnici: Radnik[];
    kupci: Kupac[];
    potvrduPotpisao: string;
    otpremnice: OtpremnicaZaKupca[];
    napomena: string,
    ukupnaCena: number,
    stanje:string;
    aktivan: string;
    izabranaPotvrda: string;
    selectedRow: number | null;
    setSelectedRow: (id: number | null) => any;
    setStanje: (aktivan: string) => any;
    onFilter: (id: number) => any;
  } 

  class FaktureTabela extends Component<Props> {
    state = {
        izabranaFaktura: "",
      aktivan: ""
    };
    
  getFormattedDatum = (rokPlacanja: string) => rokPlacanja.split("T")[0];

  setSelectedRow = (id: number) => {
    if (this.props.selectedRow === id) this.props.setSelectedRow(null);
    else {
      this.props.setSelectedRow(id);
    }
  };
  setStanje = (aktivnost: string) => {
    this.props.setStanje(aktivnost);
  };

  getImePrezime = (id: number) => {
    let radnik = this.props.radnici.find(radnik => radnik.radnikID === id);
    return radnik ? radnik.imePrezime : "";
  };
  getNazivKupca = (id: number) => {
    let kupac = this.props.kupci.find(kupac => kupac.kupacID === id);
    return kupac ? kupac.nazivKupca : "";
  };
  getOtpremnicaZaKupcaID = (id: number) => {
    let OtpremnicaZaKupca = this.props.otpremnice.find(
        OtpremnicaZaKupca => OtpremnicaZaKupca.otpremnicaID === id
    );
    return OtpremnicaZaKupca ? OtpremnicaZaKupca.otpremnicaID : "";
  };
  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };



  render() {
    return (
      <div className="container">
        <div className="form-row">
          <div className="form-group col-md-6">
            <div className="btn-group" style={{ height: "60px" }}></div>
          </div>
        </div>

        <table className="table table-hover">
          <thead className="thead-inverse">
            <tr>
              <th>#</th>
              <th>Rok placanja</th>
              <th>Napomena</th>
              <th>Ukupna cena</th>
              <th>Stanje</th>
              <th>Naziv kupaca</th>
              <th>Ime radnika</th>
              <th>Otpremnica ID</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {console.log('fakture lista', this.props.fakture)}
            {this.props.fakture.map(faktura => (
              <tr
                key={faktura.fakturaID}
                className="table-row"
                style={
                  this.props.selectedRow === faktura.fakturaID
                    ? { backgroundColor: "#BEB5B5" }
                    : {}
                }
                onClick={() => {
                  this.setSelectedRow(faktura.fakturaID);
                  // this.setStanje(faktura.stanje);
                }}
              >
                <th scope="row">{faktura.fakturaID}</th>
                <td>{this.getFormattedDatum(faktura.rokPlacanja)}</td>
                <td>{faktura.napomena}</td>
                <td>{faktura.ukupanaCena}</td>
                <td>{faktura.stanje}</td>
                <td>{this.getNazivKupca(faktura.kupacID)}</td>
                <td>{this.getImePrezime(faktura.radnikID)}</td>
                <td>{this.getOtpremnicaZaKupcaID(faktura.otpremnicaID)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FaktureTabela;
