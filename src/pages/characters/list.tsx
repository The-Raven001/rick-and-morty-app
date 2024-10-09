import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { CharacterTable } from '../../components/Table';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
}

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6  bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-white">Character List</h1>
        <CharacterTable data={characters} />
      </div>
    </div>
  );
}