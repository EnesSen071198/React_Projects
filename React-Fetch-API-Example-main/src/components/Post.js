import React, { useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  // Stil objesi
  const styles = {
    postContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    },
    loading: {
      textAlign: "center",
      fontSize: "1.5em",
      color: "#555",
      marginTop: "50px"
    },
    postItem: {
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out"
    },
    postItemHover: {
      transform: "scale(1.02)"
    },
    postTitle: {
      fontSize: "1.8em",
      color: "#333",
      marginBottom: "10px"
    },
    postBody: {
      fontSize: "1.1em",
      lineHeight: "1.6",
      color: "#555"
    },
    "@media(maxWidth: 600px)": {
      postTitle: {
        fontSize: "1.5em"
      },
      postBody: {
        fontSize: "1em"
      }
    }
  };

  return (
    <div style={styles.postContainer}>
      {loading && <div style={styles.loading}>LOADING...</div>}
      {!loading &&
        posts.map((post) => (
          <div
            key={post.id}
            style={styles.postItem}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postBody}>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default Post;
