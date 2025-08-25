import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchData;
