import React, { useEffect, useState } from "react";
import { CharacterTable } from "src/components/Table";
import Sidebar from "src/components/Sidebar";
import { CharacterModal } from "src/components/CharacterModal"; 
import { Button } from "@/components/ui/button";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null); 
  const [filters, setFilters] = useState({ name: "", gender: "", type: "", species: "" }); 

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        const apiCharacters = data.results;

        const localCharacters = JSON.parse(localStorage.getItem("localCharacters") || "[]");
        setCharacters([...apiCharacters, ...localCharacters]);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const addCharacter = (newCharacter: Character) => {
    const updatedCharacters = [...characters, newCharacter];
    const localCharacters = JSON.parse(localStorage.getItem("localCharacters") || "[]");
    const updatedLocalCharacters = [...localCharacters, newCharacter];

    localStorage.setItem("localCharacters", JSON.stringify(updatedLocalCharacters));
    setCharacters(updatedCharacters);
  };

  const editCharacter = (updatedCharacter: Character) => {
    const updatedCharacters = characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
    setCharacters(updatedCharacters);
  };

  const deleteCharacter = (id: number) => {
    const updatedCharacters = characters.filter(character => character.id !== id);
    setCharacters(updatedCharacters);

    // Update local storage if necessary
    const localCharacters: Character[] = JSON.parse(localStorage.getItem("localCharacters") || "[]");
    const updatedLocalCharacters = localCharacters.filter((character: Character) => character.id !== id);
    localStorage.setItem("localCharacters", JSON.stringify(updatedLocalCharacters));
  };

  const handleAddCharacter = (newCharacter: Character) => {
    addCharacter(newCharacter);
    setIsModalOpen(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredCharacters = characters.filter(character => {
    return (
      character.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      character.gender?.toLowerCase().includes(filters.gender.toLowerCase()) && 
      character.type?.toLowerCase().includes(filters.type.toLowerCase()) && 
      character.species?.toLowerCase().includes(filters.species.toLowerCase()) 
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-white">Character List</h1>
        
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-700 text-gray-300"
          />
          <input
            type="text"
            name="gender"
            placeholder="Filter by gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-700 text-gray-300 ml-2"
          />
          <input
            type="text"
            name="type"
            placeholder="Filter by type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-700 text-gray-300 ml-2"
          />
          <input
            type="text"
            name="species"
            placeholder="Filter by species"
            value={filters.species}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-700 text-gray-300 ml-2"
          />
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="mb-4">Add Character</Button> 
        <CharacterTable data={filteredCharacters} onEdit={editCharacter} onDelete={deleteCharacter} />
      </div>
      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCharacter}
        initialData={null} 
      />
    </div>
  );
};

export default CharacterList;