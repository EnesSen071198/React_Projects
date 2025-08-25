import "../styles/HomePage.css"; // Stilinizi buraya ekleyebilirsiniz
import LetsLearn from "../components/LetsLearn";
import AiLearn from "../components/AiLearn";
import MainTop from "../components/MainTop";

function HomePage() {
  return (
    <div>
      <MainTop />
      <LetsLearn />
      <AiLearn />
    </div>
  );
}

export default HomePage;
