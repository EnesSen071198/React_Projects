// src/data.js
import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=e4cf8e267f4b40fda2455f6f01e27aed"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
