import PropTypes from "prop-types";

function Filter({ search, setSearch }) {
  return (
    <input
      style={{ backgroundColor: "white", color: "black" }}
      type='text'
      placeholder='Search name'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

Filter.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired
};

export default Filter;
