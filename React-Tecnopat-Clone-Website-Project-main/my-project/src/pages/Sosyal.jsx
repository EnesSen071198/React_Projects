import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../data/data";
import "./Home.css";

const Sosyal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        const articlesWithIndex = result.articles.map((article, index) => ({
          ...article,
          id: index
        }));
        setData(articlesWithIndex);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='container'>
      <div className='articles'>
        <div className='row'>
          {data.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className='article-box'
              onClick={() => handleArticleClick(item)}
              role='button'
              tabIndex={0}>
              <div
                className='article-image'
                style={{ backgroundImage: `url(${item.urlToImage})` }}>
                <div className='overlay'>
                  <h2 className='title'>{item.title}</h2>
                  <div className='author-info'>
                    <span className='author'>{item.author || "Unknown"}</span>
                    <span className='date'>
                      {item.publishedAt &&
                        new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.slice(6).map((item, index) => (
          <div
            key={index}
            className='single-article'
            onClick={() => handleArticleClick(item)}
            role='button'
            tabIndex={0}>
            <div
              className='article-image'
              style={{ backgroundImage: `url(${item.urlToImage})` }}>
              <div className='overlay'>
                <h2 className='title'>{item.title}</h2>
                <div className='author-info'>
                  <span className='author'>{item.author || "Unknown"}</span>
                  <span className='date'>
                    {item.publishedAt &&
                      new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sosyal;
