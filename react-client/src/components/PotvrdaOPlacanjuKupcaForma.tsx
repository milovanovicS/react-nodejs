import React, { Component } from "react";
import { Radnik } from "../model/Radnik";
import { Kupac } from "../model/Kupac";
import { PotvrdaOPlacanjuKupca } from "../model/PotvrdaOPlacanjuKupca";
import DatePicker from "react-datepicker";
import "react-flex/index.css";
import { FakturaZaKupca } from "../model/FakturaZaKupca";

interface Props {
  radnici: Radnik[];
  kupci: Kupac[];
  potvrde: PotvrdaOPlacanjuKupca[];
  fakture: FakturaZaKupca[];
  potvrduPotpisao: String;
  selectedRow: number | null;
  fakturaZaKupcaID: number;
  radnikID: number;
  kupacID: number;
  stanje: string;
  aktivan: string;
  onAdd: (potvrde: PotvrdaOPlacanjuKupca) => Promise<any> | null;
  onUpdate: (potvrde: PotvrdaOPlacanjuKupca) => Promise<any>;
  onRemove: () => Promise<any>;
  onDefault: () => any;
}

interface State {
  potvrdaId: number;
  potvrduPotpisao: string;
  datum: Date | null;
  fakturaZaKupcaID: number;
  radnikID: number;
  kupacID: number;
  aktivan: string;
  stanje: string;
  izabranaPotvrda: number;
}

class PotvrdaOPlacanjuKupcaForma extends Component<Props, State> {
  state = {
    potvrdaId: 0,
    potvrduPotpisao: "",
    datum: null,
    fakturaZaKupcaID: 0,
    radnikID: 0,
    stanje: "",
    kupacID: 0,
    aktivan: "",
    izabranaPotvrda: 0
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (
      nextProps.selectedRow !== null &&
      nextProps.selectedRow !== prevState.potvrdaId
    ) {
      let potvrda: PotvrdaOPlacanjuKupca = nextProps.potvrde.find(
        (pot: PotvrdaOPlacanjuKupca) => pot.potvrdaID === nextProps.selectedRow
      )!;
      return {
        potvrdaId: potvrda.potvrdaID,
        stanje: potvrda.stanje,
        potvrduPotpisao: potvrda.potvrduPotpisao,
        kupacID: potvrda.kupacID,
        datum: PotvrdaOPlacanjuKupcaForma.getDatum(potvrda.datumPotvrde),
        fakturaZaKupcaID: potvrda.fakturaID,
        radnikID: potvrda.radnikID
      };
    } else {
      return prevState;
    }
  }

  static getDatum = (datum: string) => {
    let date = datum.split("T");
    let split = date[0].split("-");
    return new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2]));
  };

  handleDateChange = (e: any) => {
    this.setState({ datum: e });
  };

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  dateToYMD(date: Date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  }
  onDefault = async (e: any) => {
    e.preventDefault();
    this.setState({
      fakturaZaKupcaID: 0,
      datum: null,
      radnikID: 0,
      kupacID:0,
      potvrduPotpisao: ""
    });
    await this.props.onDefault();
  };

  onAdd = async (e: any) => {
    e.preventDefault();
    const {
      potvrduPotpisao,
      kupacID,
      datum,
      radnikID,
      fakturaZaKupcaID,
      stanje
    } = this.state;
    if (
      potvrduPotpisao !== "" &&
      datum !== null &&
      radnikID !== 0 &&
      kupacID !== 0 &&
      fakturaZaKupcaID !== 0
    ) {
      await this.props.onAdd(
        new PotvrdaOPlacanjuKupca(
          0,
          potvrduPotpisao,
          this.dateToYMD((datum as unknown) as Date),
          stanje,
          Number(kupacID),
          Number(radnikID),
          Number(fakturaZaKupcaID)
        )
      );
      this.setState({
        fakturaZaKupcaID: 0,
        datum: null,
        radnikID: 0,
        kupacID: 0,
        potvrduPotpisao: ""
      });
    }
  };

  onRemove = async (e: any) => {
    e.preventDefault();
    await this.props.onRemove();
    this.setState({
      fakturaZaKupcaID: 0,
      datum: null,
      radnikID: 0,
      kupacID: 0,
      potvrduPotpisao: ""
    });
  };

  onUpdate = async (e: any) => {
    e.preventDefault();
    const {
      potvrduPotpisao,
      kupacID,
      datum,
      radnikID,
      fakturaZaKupcaID,
      stanje
    } = this.state;
    if (
      potvrduPotpisao !== "" &&
      datum !== null &&
      radnikID !== 0 &&
      fakturaZaKupcaID !== 0
    ) {
      await this.props.onUpdate(
        new PotvrdaOPlacanjuKupca(
          this.props.selectedRow!,
          potvrduPotpisao,
          this.dateToYMD((datum as unknown) as Date),
          stanje,
          Number(kupacID),
          Number(radnikID),
          Number(fakturaZaKupcaID)
        )
      );
    }

    this.setState({
      fakturaZaKupcaID: 0,
      datum: null,
      radnikID: 0,
      kupacID: 0,
      potvrduPotpisao: ""
    });
  };


  render() {
    return (
      <div>
        <form>
          <div className="container">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="col-form-label">Faktura za kupca ID</label>
                <select
                  className="custom-select form-control"
                  name="fakturaZaKupcaID"
                  value={this.state.fakturaZaKupcaID}
                  onChange={this.handleChange}
                  disabled={this.props.aktivan === "aktivan"}
                >
                  <option value="0">Izaberite fakturu...</option>
                  {this.props.fakture.map(faktura => (
                    <option key={faktura.fakturaID} value={faktura.fakturaID}>
                      {faktura.fakturaID}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="form-group col-md-6">
                <div className="col-form-label">Datum potvrde</div>
                <DatePicker
                  className="form-control"
                  selected={this.state.datum}
                  onChange={this.handleDateChange}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="yyyy-MM-dd"
                  disabled={this.props.aktivan === "aktivan"}
                />
              </div>
              <br />
              <br />
              <div className="form-group col-md-6">
                <label className="col-form-label">Stanje</label>
                <select
                  className="custom-select form-control"
                  name="stanje"
                  value={this.state.stanje}
                  onChange={this.handleChange}
                  disabled={this.props.aktivan === "aktivan"}
                >
                  <option value="0">Izaberite stanje...</option>
                  <option value="kreiran">kreiran</option>
                  <option value="aktivan">aktivan</option>
                </select>
              </div>
              <br />
              <div className="form-group col-md-6">
                <label className="col-form-label">Potvrdu potpisao</label>
                <input
                  type="string"
                  className="form-control"
                  name="potvrduPotpisao"
                  value={this.state.potvrduPotpisao}
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <div className="form-group col-md-6">
                <label className="col-form-label">Radnik</label>
                <select
                  className="custom-select form-control"
                  name="radnikID"
                  value={this.state.radnikID}
                  onChange={this.handleChange}
                  disabled={this.props.aktivan === "aktivan"}
                >
                  <option value="0">Izaberite radnika...</option>
                  {this.props.radnici.map(radnik => (
                    <option key={radnik.radnikID} value={radnik.radnikID}>
                      {radnik.imePrezime}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label className="col-form-label">Kupac</label>
                <select
                  className="custom-select form-control"
                  name="kupacID"
                  value={this.state.kupacID}
                  onChange={this.handleChange}
                  disabled={this.props.aktivan === "aktivan"}
                >
                  <option value="0">Izaberite kupca...</option>
                  {this.props.kupci.map(kupac => (
                    <option key={kupac.kupacID} value={kupac.kupacID}>
                      {kupac.nazivKupca}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <br />
          <div className="btn-group">
            {
              <button
                id="btn-add"
                className="btn btn-primary"
                disabled={this.props.selectedRow !== null}
                onClick={this.onAdd}
              >
                <i className="fa fa-plus" /> Dodaj
              </button>
            }

            {
              <button
                id="btn-update"
                type="submit"
                className="btn btn-primary "
                disabled={
                  this.props.aktivan === "aktivan" ||
                  this.props.selectedRow === null
                }
                onClick={this.onUpdate}
              >
                <i className="fa fa-pencil" /> Izmeni
              </button>
            }

            {
              <button
                id="btn-delete"
                className="btn btn-primary"
                disabled={
                  this.props.aktivan === "aktivan" ||
                  this.props.selectedRow === null
                }
                onClick={this.onRemove}
              >
                <i className="fa fa-times" /> Obrisi
              </button>
            }
            {
              <button
                id="btn-add"
                className="btn btn-primary"
                onClick={this.onDefault}
              >
                <i className="fa fa-plus" /> Resetuj
              </button>
            }
          </div>
        </form>
      </div>
    );
  }
}

/*render() {
  return (
    <div className="container">
      <div id="heading-div">
        <h1 className="heading">Potvrde od Kupca</h1>
      </div>
      <div className="row">
         {this.state.error && <h1>{this.state.error}</h1>}
        <div className="form-group col-md-6">
          <label className="col-form-label">Unesite kriterijum za pretragu:</label>
          <input
            type="string"
            className="form-control"
            name="izabranaPotvrda"
            value={this.state.izabranaPotvrda}
            onChange={this.handleChange}
          />
          <br />
          {
            <button
              id="btn-add"
              className="btn btn-primary"
              onClick={this.onFilter}
            >
              <i className="fa fa-plus" /> Pretrazi
            </button>
          }
        </div>
        <PotvrdeTabela
          izabranaPotvrda={this.state.izabranaPotvrda}
          potvrde={this.state.potvrde}
          radnici={this.state.radnici}
          stanje={this.state.stanje}
          kupci={this.state.kupci}
          fakture={this.state.fakture}
          potvrduPotpisao={this.state.potvrduPotpisao}
          aktivan={this.state.aktivan}
          selectedRow={this.state.selectedRow}
          setSelectedRow={this.setSelectedRow}
          setStanje={this.setStanje}
          onFilter={this.onFilter}
        />
      </div>
      <br />
      <div className="row">
   <div id="fields">
        <PotvrdaOPlacanjuKupcaForma
          radnici={this.state.radnici}
          potvrde={this.state.potvrde}
          fakture={this.state.fakture}
          stanje={this.state.stanje}
          kupci={this.state.kupci}
          aktivan={this.state.aktivan}
          potvrduPotpisao={this.state.potvrduPotpisao}
          selectedRow={this.state.selectedRow}
          fakturaZaKupcaID={this.state.fakturaZaKupcaID}
          radnikID={this.state.radnikID}
          kupacID={this.state.kupacID}
          onAdd={this.onAdd}
          onUpdate={this.onUpdate}
          onRemove={this.onRemove}
          onDefault={this.onDefault}
        />
     </div>
      </div>
    </div>
  );
}*/

export default PotvrdaOPlacanjuKupcaForma;
