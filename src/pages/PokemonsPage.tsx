import React from "react";
import PokemonForm from "../components/PokemonForm";

import Layout from "../components/Layout";
import InfiniteScroll from "../components/InfiniteScroll";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { pokemonsSelector, getPokemons } from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import { cachedPokemonsSelector } from "../features/cachedPokemonsSlice";
import PokemonSkeleton from "../components/PokemonSkeleton";
import { AiFillGithub } from "react-icons/ai";

const PokemonsPage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  return (
    <Layout title="Home">
      <div className="flex items-center justify-center lg:justify-start">
        <h1 className="text-3xl lg:text-5xl font-semibold sm:text-left inline-block">
          React Pokédex
        </h1>
        
      </div>

      <InfiniteScroll
        data={pokemons.data}
        paginationHandler={(page: number) =>
          getPokemons({
            page,
            cachedPokemons: cachedPokemons.data,
            pokemons: pokemons.data,
          })
        }
        isLoading={pokemons.status.state === SliceStatus.LOADING}
      >
        {({ mutatePage }) => (
          <>
            <div className="my-4 md:my-6 lg:my-8 w-full">
              <PokemonForm
                placeholder="Search for a pokémon..."
                mutatePage={mutatePage}
              />
            </div>
            <div className="mx-auto w-full text-center">
              {!(
                cachedPokemons.status.state === SliceStatus.LOADING ||
                cachedPokemons.status.state === SliceStatus.IDLE
              ) && (
                <>
                  <InfiniteScroll.Container>
                    {pokemons.data.map((pokemon, index) =>
                      pokemon === null ? (
                        <PokemonSkeleton key={`loading-${index}`} />
                      ) : (
                        <PokemonCard key={pokemon.id} {...pokemon} />
                      )
                    )}
                  </InfiniteScroll.Container>
                  <InfiniteScroll.Waypoint />
                </>
              )}
            </div>
          </>
        )}
      </InfiniteScroll>
    </Layout>
  );
};
export default PokemonsPage;
