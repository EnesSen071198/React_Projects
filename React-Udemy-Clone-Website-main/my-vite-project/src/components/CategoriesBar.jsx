import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../styles/CategoriesBar.css";
import Tooltip from "@mui/material/Tooltip";

const CategoriesBar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const categories = [
    "Yazılım Geliştirme",
    "İşletme",
    "Finans ve Muhasebe",
    "BT ve Yazılım",
    "Ofiste Verimlilik",
    "Kişisel Gelişim",
    "Tasarım",
    "Pazarlama",
    "Sağlık ve Fitness",
    "Müzik"
  ];

  const subcategories = [
    ["Web Geliştirme", "Mobil Geliştirme", "Programlama Dilleri"],
    ["Stratejik Planlama", "Proje Yönetimi"],
    ["Muhasebe Temelleri", "Finansal Analiz"],
    ["Veri Bilimi", "Siber Güvenlik"],
    ["Microsoft Office", "Google Workspace"],
    ["Kariyer Gelişimi", "Kişisel Verimlilik"],
    ["UI/UX Tasarım", "Grafik Tasarım"],
    ["Dijital Pazarlama", "SEO"],
    ["Fitness Egzersizleri", "Sağlık Beslenme"],
    ["Enstrüman Çalma", "Şarkı Söyleme"]
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`); // Use navigate for redirect
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/subcategory/${subcategory}`); // Use navigate for redirect
  };

  return (
    <div className='categories-bar-container'>
      {categories.map((category, catIndex) => (
        <div
          key={catIndex}
          className='category-group'
          onClick={() => handleCategoryClick(category)}>
          <h3 className='category-title'>{category}</h3>
          <div className='subcategory-container'>
            {subcategories[catIndex]?.map((subcategory, subIndex) => (
              <Tooltip
                key={`${catIndex}-${subIndex}`}
                title={subcategory}
                arrow
                placement='top' // You can customize this placement as needed
              >
                <div
                  className='subcategory'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the category click from triggering
                    handleSubcategoryClick(subcategory); // Navigate to subcategory
                  }}>
                  {subcategory}
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesBar;
