import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/../hooks/use-toast";
import { Toaster } from "src/components/ui/toaster";

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: { id: number; name: string; status: string; species: string; type: string; gender: string; }) => void;
  initialData?: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
  } | null | undefined;
}

export const CharacterModal = ({ isOpen, onClose, onSave, initialData }: CharacterModalProps) => {

  const [name, setName] = React.useState(initialData?.name || "");
  const [status, setStatus] = React.useState(initialData?.status || "");
  const [species, setSpecies] = React.useState(initialData?.species || "");
  const [gender, setGender] = React.useState(initialData?.gender || "");
  const [type, setType] = React.useState(initialData?.type || "");

  const { toast } = useToast();

  React.useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status);
      setSpecies(initialData.species);
      setGender(initialData.gender)
      setType(initialData.type)
    }
  }, [initialData]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: initialData?.id!, name, status, species, type, gender });


    toast({
      title: initialData ? "Character updated successfully!" : "New character created!",
      description: `The character "${name}" has been ${initialData ? "updated" : "created"}.`,

    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-100 mb-4">{initialData ? "Edit Character" : "Add Character"}</h2>
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
              <label className="block text-gray-300">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Species</label>
              <input
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Gender</label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded"
                required
              />
            </div>

            <Button type="submit" variant="default" size="default">
              {initialData ? "Update Character" : "Create Character"}
            </Button>
            <Button type="button" onClick={onClose} variant="outline" className="ml-2">
              Cancel
            </Button>
          </form>
        </div>
      </div>
      <Toaster /> 
    </div>
  );
};