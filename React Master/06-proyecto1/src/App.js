import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { Listado } from "./components/Listado";


function App() {
  return (
    
    <div className="layout">
        <header className="header">
            <img src="logo.png" alt="logo"/>
            
            <h1>CornFlix</h1>
        </header>

        <nav className="nav">
            <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#/">Movies</a></li>
                <li><a href="#/">Blog</a></li>
                <li><a href="#/">Contact Us</a></li>
            </ul>
        </nav>

        <section id="content" className="content">

            <Listado />
            

        </section>

        <aside className="lateral">
            
            <Buscador />

            <Crear />
        </aside>


        <footer className="footer">
            &copy; Antonio Vieira Rubio
        </footer>

    </div>

    
  );
}

export default App;
