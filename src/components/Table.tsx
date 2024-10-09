import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import 'tailwindcss/tailwind.css';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
}

interface TableProps {
  data: Character[];
}

export function CharacterTable({ data }: TableProps) {
  return (
      <Table className="min-w-full bg-gray-800 font-semibold text-gray-300 rounded-xl">
        <TableHeader className="bg-gray-900">
          <TableRow>
            <TableHead className="py-3 px-4">Name</TableHead>
            <TableHead className="py-3 px-4">Status</TableHead>
            <TableHead className="py-3 px-4">Species</TableHead>
            <TableHead className="py-3 px-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((character) => (
            <TableRow key={character.id} className="hover:bg-gray-700 transition-colors">
              <TableCell className="py-2 px-4 text-gray-300">{character.name}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">{character.status}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">{character.species}</TableCell>
              <TableCell className="py-2 px-4 text-gray-300">
                <DropdownMenu>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}