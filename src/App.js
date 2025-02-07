import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Pokedex from './components/Pokedex';
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import PokemonDetailsPage from "./components/PokemonDetailsPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pokedex />} />
          <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
