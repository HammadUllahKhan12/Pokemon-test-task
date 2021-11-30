import axios from "axios";

const getAllPokemons = async (header, { search }) => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const response = await axios.get(url);
  const { results } = response.data || [];
  console.log("ressssssssssssssss", results)
  return results
};

export { getAllPokemons };
