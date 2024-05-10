import logo from './logo.svg';
import './App.css';
import { MiPrimerEstado } from './components/MiPrimerEstado';
import { EjercicioComponent } from './components/EjercicioComponent';

function App() {

  const yearActual = new Date().getFullYear();
  
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        
       <h1>El estado en React - Hook State</h1>

       <MiPrimerEstado />
       <EjercicioComponent year={yearActual}/>
      </header>
    </div>
  );
}

export default App;
