import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { EpisodeTable } from '../../components/EpisodeTable';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export default function EpisodeList() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchEpisode, setSearchEpisode] = useState("");

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.results);
        setFilteredEpisodes(data.results);
      })
      .catch((error) => console.error('Error fetching episodes:', error));
  }, []);

  useEffect(() => {
    const filtered = episodes.filter((episode) => 
      episode.name.toLowerCase().includes(searchName.toLowerCase()) &&
      episode.episode.toLowerCase().includes(searchEpisode.toLowerCase())
    );
    setFilteredEpisodes(filtered);
  }, [searchName, searchEpisode, episodes]);

  const updateEpisode = (updatedEpisode: Episode) => {
    setEpisodes((prev) => 
      prev.map((episode) => 
        episode.id === updatedEpisode.id ? updatedEpisode : episode
      )
    );

    setFilteredEpisodes((prev) => 
      prev.map((episode) => 
        episode.id === updatedEpisode.id ? updatedEpisode : episode
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-white">Episodes List</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            className="p-2 rounded bg-gray-700 text-gray-300 m-1"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Episode"
            className="p-2 rounded bg-gray-700 text-gray-300 m-1"
            value={searchEpisode}
            onChange={(e) => setSearchEpisode(e.target.value)}
          />
        </div>

        <EpisodeTable data={filteredEpisodes} onUpdate={updateEpisode} />
      </div>
    </div>
  );
}