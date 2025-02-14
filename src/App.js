import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/pokedex.css";
import Pokedex from "./components/Pokedex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetailsPage from "./components/PokemonDetailsPage";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pokedex />} />
            <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
