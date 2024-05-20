import { useEffect, useState } from "react";
import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { BrowserRouter, NavLink, useLocation } from "react-router-dom";
import { RouterPrincipal } from "./routers/RouterPrincipal";

function App() {
  const [listState, setListState] = useState([]);

  /// Use useEffect to populate listState from localStorage when the component mounts
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    setListState(movies);
  }, []);

  // Hook to get the current location
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <img src="logo.png" alt="logo" />

        <h1>MyCornFlix</h1>
      </header>

      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Contacto">Contact Us</NavLink>
          </li>
        </ul>
      </nav>

      <section id="content" className="content">
        <RouterPrincipal listState={listState} setListState={setListState} />

        {/* <Listado listState={listState} setListState={setListState} /> */}
      </section>

      {location.pathname === "/" && (
        <aside className="lateral">
          <Buscador listState={listState} setListState={setListState} />
          <Crear setListState={setListState} />
        </aside>
      )}

      {location.pathname === "/Contacto" && (
        <aside className="lateral_hide">
          <Buscador listState={listState} setListState={setListState} />
          <Crear setListState={setListState} />
        </aside>
      )}

      <footer className="footer">&copy; Antonio Vieira Rubio</footer>
    </div>
  );
}

export default App;
