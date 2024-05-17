import { useEffect, useState } from "react";
import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { Listado } from "./components/Listado";

function App() {
  const [listState, setListState] = useState([]);

  /// Use useEffect to populate listState from localStorage when the component mounts
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    setListState(movies);
  }, []);

  return (
    <div className="layout">
      <header className="header">
        <img src="logo.png" alt="logo" />

        <h1>MyCornFlix</h1>
      </header>

      <nav className="nav">
        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>
            <a href="#/">Movies</a>
          </li>
          <li>
            <a href="#/">Blog</a>
          </li>
          <li>
            <a href="#/">Contact Us</a>
          </li>
        </ul>
      </nav>

      <section id="content" className="content">
        <Listado listState={listState} setListState={setListState} />
      </section>

      <aside className="lateral">
        <Buscador />

        <Crear setListState={setListState} />
      </aside>

      <footer className="footer">&copy; Antonio Vieira Rubio</footer>
    </div>
  );
}

export default App;
