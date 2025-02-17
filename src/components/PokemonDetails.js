import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../styles/pokedex.css";
import { Link } from "react-router-dom";

const PokemonDetails = ({ pokemon }) => {
  // 타입 별 뱃지 색상
  const typeColorsKorean = {
    노말: "bg-normal",
    불꽃: "bg-fire",
    물: "bg-water",
    전기: "bg-electric",
    풀: "bg-grass",
    얼음: "bg-ice",
    격투: "bg-fighting",
    독: "bg-poison",
    땅: "bg-ground",
    비행: "bg-flying",
    에스퍼: "bg-psychic",
    벌레: "bg-bug",
    바위: "bg-rock",
    고스트: "bg-ghost",
    드래곤: "bg-dragon",
    악: "bg-dark",
    강철: "bg-steel",
    페어리: "bg-fairy",
  };

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const renderMoves = () => {
    return pokemon.moves.map((move) => <li key={move.move.name}>{move.move.korean_name}</li>);
  };

  return (
    <>
      <Container className="pokedex-detail-container mt-4">
        <div className="bx-content">
          <Row className="align-items-center">
            <Col xs={12} md={8} className="d-flex justify-content-center align-items-center">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.korean_name}
                className="pokemon-img img-fluid"
              />
              <img
                src={pokemon.sprites.back_default}
                alt={pokemon.korean_name}
                className="pokemon-img img-fluid"
              />
            </Col>
            <Col xs={12} md={4} className="pokemon-info">
              <p className="info-num">No.{pokemon.id}</p>
              <p className="info-name">{pokemon.korean_name}</p>
              <Card className="info-card">
                <p>키 : {pokemon.height / 10}m</p>
                <p>무게 : {pokemon.weight / 10}kg</p>
                <div className="type-container">
                  <p>
                    타입 :{" "}
                    {pokemon.types.map((type, index) => {
                      const koreanType = type.type?.korean_name || "알 수 없음";
                      return (
                        <span
                          key={index}
                          className={`badge ${
                            typeColorsKorean[koreanType] || "bg-secondary"
                          } me-1`}
                        >
                          {koreanType}
                        </span>
                      );
                    })}
                  </p>
                </div>
                <p>기술 :</p>
                <ul>{renderMoves()}</ul>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <div className="text-center">
        <Link to="/" className="pokemon-list-button bg-dark text-white">
          목록으로
        </Link>
      </div>
    </>
  );
};

export default PokemonDetails;
