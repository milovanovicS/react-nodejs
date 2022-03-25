import React, { Component } from "react";
import { Proizvod } from "../model/Proizvod";
import { StavkaFaktureZaKupca } from "../model/StavkaFaktureZaKupca";
import { FakturaZaKupca } from "../model/FakturaZaKupca";

interface State {
  izabranaPotvrda: string;
  aktivan: string;
}
interface Props {
  stavke: StavkaFaktureZaKupca[];
  proizvodi: Proizvod[];
  fakture: FakturaZaKupca[];
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
  
  getNazivProizvoda = (id: number) => {
    let proizvod = this.props.proizvodi.find(proizvod => proizvod.proizvodID === id);
    return proizvod ? proizvod.nazivProizvoda : "";
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
            {console.log('stavke lista', this.props.stavke)}
            {this.props.stavke.map(stavkaFakture => (
              <tr
                key={stavkaFakture.stavkaID}
                className="table-row"
                style={
                  this.props.selectedRow === stavkaFakture.stavkaID
                    ? { backgroundColor: "#BEB5B5" }
                    : {}
                }
                onClick={() => {
                  this.setSelectedRow(stavkaFakture.stavkaID);
                  // this.setStanje(stavkaFakture.stanje);
                }}
              >
                <th scope="row">{stavkaFakture.stavkaID}</th>
                <td>{this.getNazivProizvoda(stavkaFakture.proizvodID)}</td>
                <td>{this.getfakturaZaKupcaID(stavkaFakture.fakturaID)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PotvrdeTabela;
