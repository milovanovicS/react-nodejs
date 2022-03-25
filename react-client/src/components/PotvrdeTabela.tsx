import React, { Component } from "react";
import { Radnik } from "../model/Radnik";
import { PotvrdaOPlacanjuKupca } from "../model/PotvrdaOPlacanjuKupca";
import { FakturaZaKupca } from "../model/FakturaZaKupca";
import { Kupac } from "../model/Kupac";

interface State {
  izabranaPotvrda: string;
  aktivan: string;
}
interface Props {
  potvrde: PotvrdaOPlacanjuKupca[];
  radnici: Radnik[];
  kupci: Kupac[];
  potvrduPotpisao: string;
  fakture: FakturaZaKupca[];
  stanje:string;
  aktivan: string;
  izabranaPotvrda: string;
  selectedRow: number | null;
  setSelectedRow: (id: number | null) => any;
  setStanje: (aktivan: string) => any;
  onFilter: (id: number) => any;
}
class PotvrdeTabela extends Component<Props> {
  state = {
    izabranaPotvrda: "",
    aktivan: ""
  };
  getFormattedDatum = (datum: string) => datum.split("T")[0];

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
  getfakturaZaKupcaID = (id: number) => {
    let FakturaZaKupca = this.props.fakture.find(
      FakturaZaKupca => FakturaZaKupca.fakturaID === id
    );
    return FakturaZaKupca ? FakturaZaKupca.fakturaID : "";
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
              <th>Potvrdu potpisao</th>
              <th>Datum</th>
              <th>Stanje</th>
              <th>Naziv kupaca</th>
              <th>Ime radnika</th>
              <th>Faktura ID</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {console.log('potvrde lista', this.props.potvrde)}
            {this.props.potvrde.map(potvrda => (
              <tr
                key={potvrda.potvrdaID}
                className="table-row"
                style={
                  this.props.selectedRow === potvrda.potvrdaID
                    ? { backgroundColor: "#BEB5B5" }
                    : {}
                }
                onClick={() => {
                  this.setSelectedRow(potvrda.potvrdaID);
                  // this.setStanje(potvrda.stanje);
                }}
              >
                <th scope="row">{potvrda.potvrdaID}</th>
                <td style={{ marginRight: "0px" }}>
                  {potvrda.potvrduPotpisao}
                </td>
                <td>{this.getFormattedDatum(potvrda.datumPotvrde)}</td>
                <td>{potvrda.stanje}</td>
                <td>{this.getNazivKupca(potvrda.kupacID)}</td>
                <td>{this.getImePrezime(potvrda.radnikID)}</td>
                <td>{this.getfakturaZaKupcaID(potvrda.fakturaID)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PotvrdeTabela;
