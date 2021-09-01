import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { calcular } from './utils';

function Cotiz(props) {

  let [cotiz, setCotiz] = useState();
  let [cantBonos, setCantBonos] = useState(0);
  let [cantDolares, setCantDolares] = useState(0);

  useEffect(()=>{
    const toHandler = setTimeout(async () => {
      const valor = await calcular(props.ticker);      
      console.log(cantDolares)
      setCotiz(valor);
      calcBonos(valor?.CI?.venta);
    }, 5000);

    return () => clearTimeout(toHandler);
  })

  const calcBonos = (pVenta) => {
    if(cantDolares && pVenta) {
      setCantBonos(cantDolares / pVenta )
    }
  }
  
  const chHandler = (e) => {
    const cantidad = Number(e.target.value);
    setCantDolares(cantidad);
    calcBonos(cotiz?.CI?.venta);
  }


  return (
    <div>
      <h1>Cotizacion de {props.ticker}</h1>
      <h3>Dólares a vender: <br/><input type="text" onChange={chHandler}></input><br/>Bonos: {cantBonos}</h3>
      <p>CI: {cotiz?.CI?.cotiz}<br/>
      (Compra: {cotiz?.CI?.compra}  &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Venta: {cotiz?.CI?.venta} )
      </p>

      <p>C48: {cotiz?.C48?.cotiz}<br/>
      (Compra: {cotiz?.C48?.compra}  &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Venta: {cotiz?.C48?.venta} )</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <Cotiz ticker="AL30" ></Cotiz>
			<hr></hr>
			<Cotiz ticker="AAPL"></Cotiz>
      </header>
    </div>
  );
}

export default App;
