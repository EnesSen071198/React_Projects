import { useLocation, useNavigate } from "react-router-dom";
import "./Article.css";

const Article = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.article) {
    navigate("/");
    return null;
  }

  const { article } = state;

  return (
    <div className='article-container'>
      <div className='article-content'>
        <img
          src={article.urlToImage}
          alt={article.title}
          className='article-image'
        />
        <div className='article-header'>
          <h1>{article.title}</h1>
          <div className='article-meta'>
            <span className='author'>{article.author || "Unknown"}</span>
            <span className='date'>
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className='article-body'>
          <p className='article-description'>{article.description}</p>
          <div className='article-text'>{article.content}</div>
        </div>

        <button onClick={() => navigate("/")} className='back-button'>
          ← Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default Article;
