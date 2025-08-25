import { useState } from "react";
import PropTypes from "prop-types";

function Table({ characters, itemsPerPage, onRowClick }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Sayfalandırma için gerekli değişkenler
  const totalPages = Math.ceil(characters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = characters.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Origin</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((character) => (
            <tr key={character.id} onClick={() => onRowClick(character)}>
              <td>
                <img src={character.image} alt={character.name} width='50' />
              </td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
              <td>{character.origin.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfalandırma Butonları */}
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            style={{ backgroundColor: "#3498db", color: "white" }}
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// PropTypes Tanımı
Table.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      origin: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired
};

export default Table;
