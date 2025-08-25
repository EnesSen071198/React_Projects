import axios from "axios";

// API'den veri çekme fonksiyonu
const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=tesla&from=2024-10-16&sortBy=publishedAt&apiKey=e4cf8e267f4b40fda2455f6f01e27aed"
    );
    const data = response.data.articles;

    // Veri formatlama
    const formattedData = data.slice(0, 20).map((item) => ({
      title: item.title,
      description: item.description,
      image: item.urlToImage,
      category: item.source.name,
      url: item.url
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export default fetchData;
