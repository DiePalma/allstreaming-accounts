
import './css/App.css';
import './css/Button.css';

import { useState } from 'react';
import Cuenta from './Components/Cuenta';
import TipoCuenta from './Components/TipoCuenta';
import Suscripcion from './Components/Suscripcion';




function App() {
  
  const [toggleCuentas, setToggleCuentas] = useState(false);
  const [toggleTipos, setToggleTipos] = useState(false);
  const [toggleSuscripciones, setToggleSuscripciones] = useState(false);

  const handleCuentas =() =>{
    setToggleCuentas(!toggleCuentas);
    setToggleTipos(false);
    setToggleSuscripciones(false);
  };

  const handleTipos =() =>{
    setToggleTipos(!toggleTipos);
    setToggleCuentas(false);
    setToggleSuscripciones(false);
  };
  
  const handleSuscripciones =()=>{
    setToggleSuscripciones(!toggleSuscripciones);
    setToggleCuentas(false);
    setToggleTipos(false);
  }


  return (
   
    <div className='App'>
      <header className='App-header'><h1><i>ALLSTREAMING</i></h1></header>
      <main >
      {/*No necesariamente navbar, pues no se importó
      la librería necesaria  */}
    <div className='UpperBar'>  
    
     <button className='Button' onClick={handleCuentas}>Cuentas</button>
     <button className='Button' onClick={handleTipos}>Servicios de Streaming</button>
     <button className='Button' onClick={handleSuscripciones}>Suscripciones</button>
     </div>
      {toggleCuentas ? <Cuenta/>: <></>}
      {toggleTipos ? <TipoCuenta/> : <></>}
      {toggleSuscripciones ? <Suscripcion/> : <></>}

      </main>
   
    </div>
  );
}

export default App;
