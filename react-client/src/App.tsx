import React, { Component } from "react";
import { PotvrdaOPlacanjuKupca } from "./model/PotvrdaOPlacanjuKupca";
import { FakturaZaKupca } from "./model/FakturaZaKupca";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Home  from "./components/Home";
import Navigation from "./components/Navigation";
import {
  getAllRadnik,
  addPotvrda,
  removePotvrda,
  updatePotvrda,
  getAllPotvrde,
  getAllFakture,
  getAllKupac
} from "./service/api";
import { Radnik } from "./model/Radnik";
import PotvrdaOPlacanjuKupcaForma from "./components/PotvrdaOPlacanjuKupcaForma";
import PotvrdeTabela from "./components/PotvrdeTabela";
import FakturaZaKupcaForma from "./components/FakturaZaKupcaForma";

import { Kupac } from "./model/Kupac";


interface State {
  potvrde: PotvrdaOPlacanjuKupca[];
  radnici: Radnik[];
  kupci: Kupac[];
  fakture: FakturaZaKupca[];
  postoji: FakturaZaKupca[];
  stanje: string;
  potvrduPotpisao: string;
  selectedRow: number | null;
  error: string;
  izabranaPotvrda: string;
  fakturaZaKupcaID: number;
  datum: Date | null;
  radnikID: number;
  kupacID: number;
  aktivan: string;
}


class App extends Component<{}, State> {
  state = {
    potvrde: [],
    radnici: [],
    kupci: [],
    fakture: [],
    postoji: [],
    potvrduPotpisao: "",
    selectedRow: null,
    error: "",
    izabranaPotvrda: "",
    fakturaZaKupcaID: 0,
    datum: null,
    radnikID: 0,
    kupacID: 0,
    stanje: "",
    aktivan: ""
  };

  setSelectedRow = (id: number | null) => this.setState({ selectedRow: id });

  setStanje = (aktivnost: string) => {
    this.setState({ aktivan: aktivnost });
  };

  async getPotvrde() {
    try {
      this.setState({ potvrde: await getAllPotvrde() });
    } catch (e) {
      console.log(e);
    }
  }

  async getRadnici() {
    try {
      this.setState({ radnici: await getAllRadnik() });
    } catch (e) {
      console.log(e);
    }
  }
  async getKupci() {
    try {
      this.setState({ kupci: await getAllKupac() });
    } catch (e) {
      console.log(e);
    }
  }
  async getFakture() {
    try {
      this.setState({ fakture: await getAllFakture() });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.getPotvrde();
    await this.getFakture();
    await this.getRadnici();
    await this.getKupci();
  }

  onFilter = async () => {
    try {
      this.setState({
        potvrde: this.state.potvrde.filter(
          (pot: PotvrdaOPlacanjuKupca) => (
            pot.potvrdaID ===+ this.state.izabranaPotvrda  ||  pot.potvrduPotpisao.includes(this.state.izabranaPotvrda) || pot.potvrduPotpisao.includes(this.state.izabranaPotvrda))
            )
          });
    } catch (e) {
      this.setState({ error: "Network error" });
    }
  };

  onDefault = async () => {
    try {
      try {
        this.setState({
          potvrde: await getAllPotvrde(),
          selectedRow: null,
          izabranaPotvrda: ""
        });
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  onAdd = async (potvrda: PotvrdaOPlacanjuKupca) => {
    try {
      let res = await addPotvrda(potvrda);
      if (res.error) this.setState({ error: res.error });
      else {
        this.setState({
          potvrde: [
            ...this.state.potvrde,
            {
              ...res,
              radnikID: res.radnikID.radnikID,
              kupacID: res.kupacID.kupacID,
              fakturaZaKupcaID: res.fakturaID.fakturaID
            }
          ]
        });
      }
    } catch (e) {
      this.setState({ error: "Network error" });
    }
  };

  onRemove = async () => {
    try {
      const potvrdaId = this.state.selectedRow!;
      await removePotvrda(potvrdaId);
      this.setState({
        potvrde: this.state.potvrde.filter(
          (pot: PotvrdaOPlacanjuKupca) => pot.potvrdaID !== potvrdaId
        ),
        selectedRow: null
      });
    } catch (e) {
      this.setState({ error: "Network error" });
    }
  };

  onUpdate = async (potvrda: PotvrdaOPlacanjuKupca) => {
    try {
      let res = await updatePotvrda(potvrda);
      if (res.error) this.setState({ error: res.error });
      else
        this.setState({
          potvrde: this.state.potvrde.map((pot: PotvrdaOPlacanjuKupca) =>
            pot.potvrdaID === potvrda.potvrdaID ? potvrda : pot
          ),
          selectedRow: null
        });
    } catch (e) {
      this.setState({ error: "Network error" });
    }
  };
  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

 render(){
  return (
    <Home></Home>
  )
 }

}
export default App;




 
