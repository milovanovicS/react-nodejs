import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import InternoPraviloZaReklamacijeRoutes from "./src/routes/StavkaFaktureRoutes";
import RadnikRoutes from "./src/routes/RadnikRoutes";
import ReklamacijaZaDobavljacaRoutes from "./src/routes/FakturaZaKupcaRoutes";
import cors from 'cors';

createConnection().then(connection => {

    // create express app
    const app = express();
    // set middlewares
    app.use(bodyParser.json());
    app.use(cors());

    // add routers
    app.use("/pravila", InternoPraviloZaReklamacijeRoutes);
    app.use("/radnici", RadnikRoutes);
    app.use("/reklamacije", ReklamacijaZaDobavljacaRoutes)
    
    // start express server
    app.listen(3000, () => console.log("Listening on 3000..."));

}).catch(error => console.log(error));