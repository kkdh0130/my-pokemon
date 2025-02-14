import axios from "axios";
import React, { useRef, useCallback } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import "../styles/pokedex.css";

const Pokedex = () => {
  // 타입 별 뱃지 색상
  const typeColors = {
    normal: "bg-normal",
    fire: "bg-fire",
    water: "bg-water",
    electric: "bg-electric",
    grass: "bg-grass",
    ice: "bg-ice",
    fighting: "bg-fighting",
    poison: "bg-poison",
    ground: "bg-ground",
    flying: "bg-flying",
    psychic: "bg-psychic",
    bug: "bg-bug",
    rock: "bg-rock",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    steel: "bg-steel",
    fairy: "bg-fairy",
  };

  const typeKoreanNames = {
    // 타입 별 한글
    normal: "노말",
    fire: "불꽃",
    water: "물",
    electric: "전기",
    grass: "풀",
    ice: "얼음",
    fighting: "격투",
    poison: "독",
    ground: "땅",
    flying: "비행",
    psychic: "에스퍼",
    bug: "벌레",
    rock: "바위",
    ghost: "고스트",
    dragon: "드래곤",
    dark: "악",
    steel: "강철",
    fairy: "페어리",
  };

  const limit = 20;
  const observer = useRef(null);

  // 데이터 불러오는 함수
  const fetchPokemonData = async ({ pageParam = 0 }) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${limit}`,
    );

    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        const species = await axios.get(details.data.species.url);

        // 한글 이름 가져오기
        const koreanName =
          species.data.names.find((name) => name.language.name === "ko")?.name ||
          details.data.name;

        return {
          id: details.data.id,
          name: details.data.name,
          koreanName: koreanName,
          image:
            details.data.sprites.versions["generation-v"]["black-white"].animated.front_default ||
            details.data.sprites.front_default,
          types: details.data.types.map((type) => type.type.name),
        };
      }),
    );

    return { pokemon: pokemonDetails, nextOffset: pageParam + limit };
  };

  // useInfiniteQuery 사용
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

  // 마지막 요소 감지하여 새로운 데이터 불러오기
  const lastElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  return (
    <Container className="pokedex-container dark-mode">
      <div className="logo-container d-none d-sm-block text-center mb-3">
      <img
          src={`${process.env.PUBLIC_URL}/icons/pokemon-logo.webp`}
          alt="Pokémon Logo"
          className="pokemon-logo"
        />      </div>
      <Form className="mb-4">
        <Form.Control type="text" placeholder="포켓몬의 이름을 검색하세요!" />
      </Form>
      <Row className="justify-content-center">
        {status === "loading" ? (
          <p className="text-center">로딩 중...</p>
        ) : (
          data?.pages.map((page, pageIndex) =>
            page.pokemon.map((pokemon, index) => {
              const isLastElement =
                pageIndex === data.pages.length - 1 && index === page.pokemon.length - 1;
              return (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={pokemon.id}
                  className="pokemon mb-4"
                  ref={isLastElement ? lastElementRef : null}
                >
                  <Link to={`/pokemon/${pokemon.id}`} className="text-decoration-none">
                    <Card className="text-center pokemon-card">
                      <Card.Img
                        variant="top"
                        src={pokemon.image}
                        alt={pokemon.koreanName}
                        className="pokemon-img"
                      />
                      <Card.Body>
                        <Card.Text className="pokemon-card-num">No.{pokemon.id}</Card.Text>
                        <Card.Title className="pokemon-card-title">
                          {pokemon.koreanName}
                        </Card.Title>
                        <div>
                          {pokemon.types.map((type, index) => (
                            <span
                              key={index}
                              className={`badge ${typeColors[type] || "bg-secondary"} me-1`}
                            >
                              {typeKoreanNames[type] || type}
                            </span>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            }),
          )
        )}
      </Row>
      {isFetchingNextPage && <p className="text-center">로딩 중...</p>}
    </Container>
  );
};

export default Pokedex;
