import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesBar from "./components/CategoriesBar";
import HomePage from "./pages/HomePage";
import YazılımGeliştirme from "./category/YazılımGeliştirme";
import LetsLearn from "./components/LetsLearn";
import AiLearn from "./components/AiLearn";
import CourseDetail from "./components/CourseDetail"; // Kurs detayları sayfası
import Header from "./components/Header";
import WebLearn from "./components/WebLearn";
import AndroidLearn from "./components/AndroidLearn";
import SqlLearn from "./components/SqlLearn";
import PytonLearn from "./components/PythonLearn";

const App = () => {
  return (
    <div>
      <Header />
      <CategoriesBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/category/Yazılım Geliştirme'
          element={<YazılımGeliştirme />}
        />
        <Route path='/course/:id' element={<CourseDetail />} />
      </Routes>
      <LetsLearn />
      <AiLearn />
      <PytonLearn />
      <WebLearn />
      <AndroidLearn />
      <SqlLearn />
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
