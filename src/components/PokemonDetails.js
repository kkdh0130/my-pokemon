import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/pokedex.css";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const renderTypes = () => {
    return pokemon.types.map((type, index) => (
      <span key={type.type.name}>
        {type.type.korean_name}
        {index < pokemon.types.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const renderAbilities = () => {
    return pokemon.abilities.map((ability, index) => (
      <span key={ability.ability.name}>
        {ability.ability.korean_name}
        {index < pokemon.abilities.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const renderMoves = () => {
    return pokemon.moves.map((move) => <li key={move.move.name}>{move.move.korean_name}</li>);
  };

  return (
    <>
      <Container className="pokedex-detail-container mt-4">
        <div className="bx-content">
          <h2>{pokemon.korean_name}</h2>
          <Row className="align-items-center">
            <Col xs={12} md={8} className="d-flex justify-content-center align-items-center">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.korean_name}
                className="pokemon-img img-fluid"
              />
            </Col>
            <Col xs={8} md={4} className="pokemon-info">
              <p>No.{pokemon.id}</p>
              <p>이름 : {pokemon.korean_name}</p>
              <p>키 : {pokemon.height / 10}m</p>
              <p>무게 : {pokemon.weight / 10}kg</p>
              <p>속성 : {renderTypes()}</p>
              <p>특성 : {renderAbilities()}</p>
              <p>기술 :</p>
              <ul>{renderMoves()}</ul>
            </Col>
          </Row>
        </div>

      </Container>
      <div className="text-center pokemon-list-button">
          <a href="/">목록</a>
        </div>
    </>
  );
};

export default PokemonDetails;
