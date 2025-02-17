import axios from "axios";
import React, { useRef, useCallback, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import "../styles/pokedex.css";

const Pokedex = () => {
  // 검색창에서 입력한 값 저장
  const [searchTerm, setSearchTerm] = useState("");

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

  const limit = 20;
  // 무한 스크롤 감지 Ref
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

        // 타입 한글 이름 가져오기
        const typesWithKoreanNames = await Promise.all(
          details.data.types.map(async (type) => {
            const typeResponse = await axios.get(type.type.url);
            const koreanTypeName =
              typeResponse.data.names.find((name) => name.language.name === "ko")?.name ||
              type.type.name;
            return { name: type.type.name, korean_name: koreanTypeName };
          }),
        );

        return {
          id: details.data.id,
          name: details.data.name,
          koreanName: koreanName,
          image:
            details.data.sprites.versions["generation-v"]["black-white"].animated.front_default ||
            details.data.sprites.front_default,
          types: typesWithKoreanNames,
        };
      }),
    );

    // 다음 페이지 off셋 반환
    return { pokemon: pokemonDetails, nextOffset: pageParam + limit };
  };

  // useInfiniteQuery 사용 (React Query 사용)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonData, // 데이터를 가져오는 함수
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

  // 마지막 요소 감지하여 새로운 데이터 불러오기 (무한 스크롤)
  const lastElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); //
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  // 검색어 입력
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  // 검색 기능
  const filteredPokemon = data
    ? data.pages.flatMap((page) =>
        page.pokemon.filter(
          (pokemon) => pokemon.koreanName && pokemon.koreanName.includes(searchTerm),
        ),
      )
    : [];

  return (
    <Container className="pokedex-container dark-mode">
      <div className="logo-container d-none d-sm-block text-center mb-3">
        <img
          src={`${process.env.PUBLIC_URL}/icons/pokemon-logo.webp`}
          alt="Pokémon Logo"
          className="pokemon-logo"
        />
      </div>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="포켓몬의 이름을 검색하세요!"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form>
      <Row className="justify-content-center">
        {status === "loading" ? (
          <p className="text-center">로딩 중...</p>
        ) : filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon, index) => {
            const isLastElement = index === filteredPokemon.length - 1;
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
                      <Card.Title className="pokemon-card-title">{pokemon.koreanName}</Card.Title>
                      <div>
                        {pokemon.types.map((type, index) => (
                          <span
                            key={index}
                            className={`badge ${
                              typeColorsKorean[type.korean_name] || "bg-secondary"
                            } me-1`}
                          >
                            {type.korean_name}
                          </span>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })
        ) : (
          <p className="text-center">😢 검색 결과가 없습니다.</p>
        )}
      </Row>
      {isFetchingNextPage && !searchTerm && <p className="text-center">로딩 중...</p>}
    </Container>
  );
};

export default Pokedex;
