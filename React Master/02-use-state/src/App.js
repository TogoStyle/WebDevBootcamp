import logo from './logo.svg';
import './App.css';
import { MiPrimerEstado } from './components/MiPrimerEstado';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        
       <h1>El estado en React - Hook State</h1>

       <MiPrimerEstado />
      </header>
    </div>
  );
}

export default App;
