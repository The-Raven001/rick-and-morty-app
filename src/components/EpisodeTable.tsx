import React from "react";
import { Button } from "@/components/ui/button";
import { EpisodeModal } from "./EpisodeModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeTableProps {
  data: Episode[];
}

export const EpisodeTable: React.FC<EpisodeTableProps & { onUpdate: (updatedEpisode: Episode) => void }> = ({ data, onUpdate }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedEpisode, setSelectedEpisode] = React.useState<Episode | null>(null);

  const handleEditClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEpisode(null);
  };

  const handleSave = (updatedEpisode: Episode) => {
    console.log("Episode updated:", updatedEpisode);
    onUpdate(updatedEpisode);
  };

  return (
    <div className="overflow-x-auto">
      <div >
        <Table className=" bg-gray-800 text-gray-100 rounded-xl h-screen">
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
                  <Button className="bg-customGray-900" size="sm" onClick={() => handleEditClick(episode)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EpisodeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        initialData={selectedEpisode}
      />
    </div>
  );
};