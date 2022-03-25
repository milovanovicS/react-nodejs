import React from 'react';
import Navigation from './Navigation';
import { Switch, Route } from 'react-router-dom';
import PotvrdaOPlacanjuKupcaForma from './PotvrdaOPlacanjuKupcaForma';
import FakturaZaKupcaForma from './FakturaZaKupcaForma';
 
const home = () => {
    return (
       <div>
          <h1>Pocetna</h1>
           <p>Izbor slucaja koriscenja</p>
           
           
        <div>
          <Navigation/>
            {/* <Switch>
             <Route path="/potvrda" component={PotvrdaOPlacanjuKupcaForma}/>
             <Route path="/faktura" component={FakturaZaKupcaForma}/> }
           </Switch> */}
        </div> 
  
</div>
 );
}
 
export default home;