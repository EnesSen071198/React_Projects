import { useState, useEffect } from "react";
import CharacterTable from "../components/Table";
import SearchBar from "../components/Filter";

function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      let allCharacters = [];
      let nextPage = "https://rickandmortyapi.com/api/character";

      while (nextPage && allCharacters.length < 250) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        nextPage = data.info.next;
      }

      setCharacters(allCharacters.slice(0, 250)); // 250 karaktere kadar gösterim
    };

    fetchCharacters().catch((error) =>
      console.error("Error fetching data:", error)
    );
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
  };

  const resetToMainMenu = () => {
    setSearch("");
    setSelectedCharacter(null);
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <CharacterTable
        characters={filteredCharacters}
        itemsPerPage={10}
        onRowClick={handleRowClick}
      />

      {/* Karakter Detayı */}
      {selectedCharacter && (
        <div className='character-details'>
          <h2>{selectedCharacter.name}</h2>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>
            <strong>Status:</strong> {selectedCharacter.status}
          </p>
          <p>
            <strong>Species:</strong> {selectedCharacter.species}
          </p>
          <p>
            <strong>Gender:</strong> {selectedCharacter.gender}
          </p>
          <p>
            <strong>Origin:</strong> {selectedCharacter.origin.name}
          </p>
        </div>
      )}

      {/* Ana Menüye Dön Butonu */}
      <div className='button-container'>
        <button onClick={resetToMainMenu} className='reset-button'>
          Ana Menü
        </button>
      </div>
    </div>
  );
}

export default HomePage;
