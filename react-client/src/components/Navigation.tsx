import React from 'react';
 
import { NavLink } from 'react-router-dom';
import { Router } from 'express';
 
const Navigation = () => {
    return (
       <div>
          <Router>
          <button><NavLink to="/">Home</NavLink></button>
          <button><NavLink to="/potvrda">Potvrda o placanju kupca</NavLink></button>
          <button><NavLink to="/faktura">Faktura za kupca</NavLink></button>
          </Router>
          
       </div>
    );
}
 
export default Navigation;
