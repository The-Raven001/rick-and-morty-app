import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import 'tailwindcss/tailwind.css';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeTableProps {
  data: Episode[];
}

export const EpisodeTable: React.FC<EpisodeTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-gray-800 text-gray-100 shadow-md rounded-xl">
        <TableHeader className="bg-gray-900">
          <TableRow>
            <TableHead className="py-2 px-4">Name</TableHead>
            <TableHead className="py-2 px-4">Air Date</TableHead>
            <TableHead className="py-2 px-4">Episode</TableHead>
            <TableHead className="py-2 px-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((episode) => (
            <TableRow key={episode.id} className="hover:bg-gray-700 transition-colors">
              <TableCell className="py-2 px-4">{episode.name}</TableCell>
              <TableCell className="py-2 px-4">{episode.air_date}</TableCell>
              <TableCell className="py-2 px-4">{episode.episode}</TableCell>
              <TableCell className="py-2 px-4">
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};