import React, { Component } from "react";
import { Radnik } from "../model/Radnik";
import { Kupac } from "../model/Kupac";
import { OtpremnicaZaKupca } from "../model/OtpremnicaZaKupca";
import { FakturaZaKupca } from "../model/FakturaZaKupca";
import DatePicker from "react-datepicker";
import "react-flex/index.css";
import { StavkaFaktureZaKupca } from "../model/StavkaFaktureZaKupca";

interface Props {
    radnici: Radnik[];
    kupci: Kupac[];
    fakture: FakturaZaKupca[];
    otpremnice: OtpremnicaZaKupca[];
    selectedRow: number | null;
    otpremnicaID: number;
    radnikID: number;
    kupacID: number;
    napomena: string;
    ukupnaCena: number;
    stanje: string;
    aktivan: string;
    onAdd: (fakture: FakturaZaKupca) => Promise<any> | null;
    onUpdate: (fakture: FakturaZaKupca) => Promise<any>;
    onRemove: () => Promise<any>;
    onDefault: () => any;
  }
  
  interface State {
    fakturaId: number;
    rokPlacanja: Date | null;
    otpremnicaID: number;
    radnikID: number;
    kupacID: number;
    aktivan: string;
    napomena: string;
    ukupnaCena: number;
    stanje: string;
    izabranaFaktura: number;
  }
  
  class FakturaZaKupcaForma extends Component<Props, State> {
    state = {
      fakturaId: 0,
      rokPlacanja: null,
      otpremnicaID: 0,
      radnikID: 0,
      napomena: "",
      ukupnaCena: 0,
      stanje: "",
      kupacID: 0,
      aktivan: "",
      izabranaFaktura: 0
    };
  
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
      if (
        nextProps.selectedRow !== null &&
        nextProps.selectedRow !== prevState.fakturaId
      ) {
        let faktura: FakturaZaKupca = nextProps.fakture.find(
          (fakt: FakturaZaKupca) => fakt.fakturaID === nextProps.selectedRow
        )!;
        return {
          fakturaId: faktura.fakturaID,
          napomena: faktura.napomena,
          ukupnaCena: faktura.ukupanaCena,
          stanje: faktura.stanje,
          kupacID: faktura.kupacID,
          rokPlacanja: FakturaZaKupcaForma.getDatum(faktura.rokPlacanja),
          otpremnicaID: faktura.otpremnicaID,
          radnikID: faktura.radnikID
        };
      } else {
        return prevState;
      }
    }
  
    static getDatum = (rokPlacanja: string) => {
      let date = rokPlacanja.split("T");
      let split = date[0].split("-");
      return new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2]));
    };
  
    handleDateChange = (e: any) => {
      this.setState({ rokPlacanja: e });
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
        otpremnicaID: 0,
        rokPlacanja: null,
        radnikID: 0,
        kupacID:0,
      });
      await this.props.onDefault();
    };
  
    onAdd = async (e: any) => {
      e.preventDefault();
      const {
        kupacID,
        rokPlacanja,
        radnikID,
        otpremnicaID,
        napomena,
        ukupnaCena,
        stanje
      } = this.state;
      if (
        rokPlacanja !== null &&
        radnikID !== 0 &&
        kupacID !== 0 &&
        otpremnicaID !== 0
      ) {
        await this.props.onAdd(
          new FakturaZaKupca(
            0,
            this.dateToYMD((rokPlacanja as unknown) as Date),
            napomena,
            ukupnaCena,
            stanje,
            Number(kupacID),
            Number(radnikID),
            Number(otpremnicaID)
          )
        );
        this.setState({
          otpremnicaID: 0,
          rokPlacanja: null,
          radnikID: 0,
          kupacID: 0,
          napomena: "",
          ukupnaCena: 0
        });
      }
    };
  
    onRemove = async (e: any) => {
      e.preventDefault();
      await this.props.onRemove();
      this.setState({
        otpremnicaID: 0,
        rokPlacanja: null,
        radnikID: 0,
        kupacID: 0,
        napomena: "",
        ukupnaCena: 0
      });
    };
  
    onUpdate = async (e: any) => {
      e.preventDefault();
      const {
        kupacID,
        rokPlacanja,
        radnikID,
        otpremnicaID,
        napomena,
        ukupnaCena,
        stanje
      } = this.state;
      if (
        rokPlacanja !== null &&
        radnikID !== 0 &&
        otpremnicaID !== 0
      ) {
        await this.props.onUpdate(
          new FakturaZaKupca(
            this.props.selectedRow!,
            this.dateToYMD((rokPlacanja as unknown) as Date),
            napomena,
            ukupnaCena,
            stanje,
            Number(kupacID),
            Number(radnikID),
            Number(otpremnicaID)
          )
        );
      }
  
      this.setState({
        otpremnicaID: 0,
        rokPlacanja: null,
        radnikID: 0,
        kupacID: 0
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
                    name="otpremnicaID"
                    value={this.state.otpremnicaID}
                    onChange={this.handleChange}
                    disabled={this.props.aktivan === "aktivan"}
                  >
                    <option value="0">Izaberite otpremnicu...</option>
                    {this.props.fakture.map(faktura => (
                      <option key={faktura.otpremnicaID} value={faktura.otpremnicaID}>
                        {faktura.otpremnicaID}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div className="form-group col-md-6">
                  <div className="col-form-label">Datum fakture</div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.rokPlacanja}
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
  
  export default FakturaZaKupcaForma;
  