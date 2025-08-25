import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import VideoPage from "./pages/VideoPage";
import Page1 from "./contents/Page1";
import Page2 from "./contents/Page2";
import Page3 from "./contents/Page3";
import Page4 from "./contents/Page4";
import MainData from "./data/MainData";
import Footer from "./components/Footer";
import MobilUygulama from "./pages/MobilUygulama";
import Otomobil from "./pages/Otomobil";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/NewsPage' element={<NewsPage />} />
        <Route path='/VideoPage' element={<VideoPage />} />
        {/* Dinamik Route Oluşturma */}
        {MainData.map((data) => (
          <Route
            key={data.id} // key burada olmalı, her Route için benzersiz olmalı
            path={`/Page${data.id}`} // Dinamik olarak path oluşturuluyor
            element={
              <Page1
                title={data.title}
                image={data.image}
                post={data.post}
                author={data.author}
                readTime={data.readTime}
                categories={data.categories}
                intro={data.intro}
              />
            }
          />
        ))}
        <Route path='/Page2' element={<Page2 />} />
        <Route path='/Page3' element={<Page3 />} />
        <Route path='/Page4' element={<Page4 />} />
        <Route path='/MobilUygulama' element={<MobilUygulama />} />
        <Route path='/Otomobil' element={<Otomobil />} />
        Otomobil
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
