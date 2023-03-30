import axios from 'axios';
import { useQuery } from 'react-query';
import { Character } from './useCharacters';

const fetchCharacterDetail = async (characterId: number) => {
  const { data } = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${characterId}`);
  return data;
};

const useCharacterDetail = (characterId: number) => useQuery(
  [ 'characters', characterId ],
  () => fetchCharacterDetail(characterId),
);

export default useCharacterDetail;
