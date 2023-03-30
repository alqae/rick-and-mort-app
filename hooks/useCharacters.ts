import axios from 'axios';
import { useQuery } from 'react-query';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const fetchCharacters = async (
  page: number,
  search: string,
  status: string | null,
  gender: string | null,
) => {
  const params = new URLSearchParams({ status: 'died' });
  params.append('page', page.toString());

  // if (search) {
  //   params.append('name', search);
  // }

  // if (status) {
  //   params.append('status', status);
  // }

  // if (gender) {
  //   params.append('gender', gender);
  // }

  const { data } = await axios.get<{
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: Character[];
  }>('https://rickandmortyapi.com/api/character?status=Alive', { params });
  return data;
};

const useCharacters = (
  page: number,
  query: string,
  status: string | null,
  gender: string | null,
) => useQuery(['characters', page, query, status, gender], () => fetchCharacters(page, query, status, gender));
export default useCharacters;
