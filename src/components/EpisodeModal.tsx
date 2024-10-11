import React from "react";
import { Button } from "@/components/ui/button";
import { useToast} from "@/../hooks/use-toast"
import {Toaster} from "src/components/ui/toaster"

interface EpisodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (episode: { id: number; name: string; air_date: string; episode: string }) => void;
  initialData?: {
    id: number;
    name: string;
    air_date: string;
    episode: string;
  } | null;
}

export const EpisodeModal: React.FC<EpisodeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = React.useState(initialData?.name || "");
  const [airDate, setAirDate] = React.useState(initialData?.air_date || "");
  const [episode, setEpisode] = React.useState(initialData?.episode || "");

  const { toast } = useToast()

  React.useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAirDate(initialData.air_date);
      setEpisode(initialData.episode);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if initialData is defined
    if (!initialData) return; // Prevent errors if there's no initial data

    onSave({ id: initialData.id, name, air_date: airDate, episode });

    toast({
        title:"Episode updated successfully!",
        description: `The episode "${name}" has been updated.`,
  
      })

    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          {initialData ? "Edit Episode" : "Add Episode"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-100 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Air Date</label>
            <input
              type="text"
              value={airDate}
              onChange={(e) => setAirDate(e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-100 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Episode</label>
            <input
              type="text"
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-100 rounded"
              required
            />
          </div>
          <Button type="submit" variant="default" size="default">
            {"Update Episode"}
          </Button>
          <Button type="button" onClick={onClose} variant="outline" className="ml-2">
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};