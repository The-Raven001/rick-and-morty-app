import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CharacterModal } from "@/components/CharacterModal";
import { Button } from "@/components/ui/button";
import 'tailwindcss/tailwind.css';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}

interface TableProps {
  data: Character[];
  onEdit: (character: Character) => void;
  onDelete: (id: number) => void;
}

export function CharacterTable({ data, onEdit, onDelete }: TableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleEditClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      onDelete(id);
    }
  };

  const handleSave = (updatedCharacter: Character) => {
    onEdit(updatedCharacter);
    setSelectedCharacter(null);
    setIsModalOpen(false); 
  };

  return (
    <>
      <Table className="min-w-full bg-gray-800 font-semibold text-gray-300 rounded-xl">
        <TableHeader className="bg-gray-900">
          <TableRow>
            <TableHead className="py-3 px-4">Name</TableHead>
            <TableHead className="py-3 px-4">Status</TableHead>
            <TableHead className="py-3 px-4">Species</TableHead>
            <TableHead className="py-3 px-4">Gender</TableHead>
            <TableHead className="py-3 px-1">Type</TableHead>
            <TableHead className="py-3 px-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((character) => (
            <TableRow key={character.id} className="hover:bg-gray-700 transition-colors">
              <TableCell className="py-2 px-4 text-gray-300">{character.name}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">{character.status}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">{character.species}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">{character.gender}</TableCell>
              <TableCell className="py-2 px-1 text-gray-300">{character.type}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 text-gray-300">
                    <DropdownMenuItem onClick={() => handleEditClick(character)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteClick(character.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedCharacter || undefined}
      />
    </>
  );
}