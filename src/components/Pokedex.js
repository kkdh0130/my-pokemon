import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../styles/pokedex.css";
import { Link } from "react-router-dom";
import TopButton from "./TopButton";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allPokemonData = [];
      for (let i = 1; i <= 151; i++) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
        const koreaName = speciesResponse.data.names.find((name) => name.language.name === "ko");
        allPokemonData.push({ ...response.data, korean_name: koreaName.name });
      }
      setPokemonData(allPokemonData);
    };

    fetchData();
  }, []);

  const renderTypes = (types) => {
    return types.map((type, index) => (
      <span key={type.type.name}>
        {type.type.name}
        {index < types.length - 1 ? ", " : ""}
      </span>
    ))
  }

  return (
    <>
      {" "}
      <Container className="pokedex-container">
        <Row className="justify-content-center">
          {pokemonData.map((pokemon) => (
            <Col xs={12} sm={4} md={3} lg={3} key={pokemon.id} className="pokemon">
              <Link to={`/pokemon/${pokemon.id}`} className="text-decoration-none">
                <Card className="text-center pokemon-card">
                  <Card.Img
                    variant="top"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.korean_name}
                  />
                  <Card.Body>
                  <Card.Text className="pokemon-card-num">No.{pokemon.id}</Card.Text>
                    <Card.Title className="pokemon-card-title">{pokemon.korean_name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <TopButton />
    </>
  );
};

export default Pokedex;
