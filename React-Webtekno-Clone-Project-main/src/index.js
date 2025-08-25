import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />{" "}
    {/* BrowserRouter burada App içinde olduğundan, burada tekrar eklemeye gerek yok */}
  </React.StrictMode>
);

// Eğer performansı ölçmek istiyorsanız, bu fonksiyonu kullanabilirsiniz
reportWebVitals();
