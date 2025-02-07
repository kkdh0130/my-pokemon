import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        const koreanName =
          speciesResponse.data.names.find((name) => name.language.name === "ko")?.name ??
          "알 수 없음";

        const typesWithKoreanNames = await Promise.all(
          response.data.types.map(async (type) => {
            const typeResponse = await axios.get(type.type.url);
            const koreanTypeName =
              typeResponse.data.names.find((name) => name.language.name === "ko")?.name ??
              type.type.name;
            return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
          }),
        );

        const abilitiesWithKoreanNames = await Promise.all(
          response.data.abilities.map(async (ability) => {
            const abilityResponse = await axios.get(ability.ability.url);
            const koreanAbilityName =
              abilityResponse.data.names.find((name) => name.language.name === "ko")?.name ??
              ability.ability.name;
            return { ...ability, ability: { ...ability.ability, korean_name: koreanAbilityName } };
          }),
        );

        const movesWithKoreanNames = await Promise.all(
          response.data.moves.slice(0, 5).map(async (move) => {
            const moveResponse = await axios.get(move.move.url);
            const koreanMoveName =
              moveResponse.data.names.find((name) => name.language.name === "ko")?.name ??
              move.move.name;
            return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
          }),
        );

        setPokemonData({
          ...response.data,
          korean_name: koreanName,
          types: typesWithKoreanNames,
          abilities: abilitiesWithKoreanNames,
          moves: movesWithKoreanNames,
        });
      } catch (error) {
        console.error("포켓몬 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="pokemon-details-page">
      <div className="pokemon-details-container">
        {pokemonData ? <PokemonDetails pokemon={pokemonData} /> : <p>몬스터볼에서 포켓몬을 꺼내오는 중...</p>}
      </div>
    </div>
  );
};


export default PokemonDetailsPage;
