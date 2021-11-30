import React, { useState } from 'react';
import pick from 'lodash/pick';
import { gql, useQuery } from "@apollo/client";

import PARTY from '../queries/party.graphql';
import SEARCH from '../queries/search.graphql';

export function Application() {
  const [search, setSearch] = useState('');

  const partyResult = useQuery(gql(PARTY));
  const searchResult = useQuery(gql(SEARCH), { variables: search });

  console.log({
    party: pick(partyResult, ['data', 'error', 'loading']),
    search: pick(searchResult, ['data', 'error', 'loading'])
  });

  return (
    <>
      <h1>Pokémon party creator</h1>
      <div className="container">

        {/* Search / add */}
        <input id="search" list="pokemon" onChange={e => setSearch(e.currentTarget.value)}/>
        <button id="add">Add</button>
        <datalist id="pokemon">
          {searchResult?.data?.search?.map(pokemon => <option value={pokemon.name}/>)}
        </datalist>

        {/* Party */}
        <div className="party">
          <h2>My party</h2>
          {partyResult?.data?.party?.map(pokemon => (
            <div className="party-item">
              <img src={pokemon.image} />
              <span>
                {pokemon.name}
              </span>
              <button className="remove">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
