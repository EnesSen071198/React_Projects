import React, { useState } from 'react'; // useState React Hook'unu import ediyoruz
import './App.css'; // CSS dosyasını import ediyoruz

function App() {
  const [items, setItems] = useState([]); // Ürünlerin tutulduğu liste için state
  const [inputValue, setInputValue] = useState(''); // Metin kutusundaki değeri tutan state

  // Ürün ekleme fonksiyonu
  const addItem = () => {
    if (inputValue) { // Eğer metin kutusu boş değilse
      setItems([...items, inputValue]); // Ürünler listesine yeni ürünü ekle
      setInputValue(''); // Metin kutusunu temizle
    }
  };

  // Ürün silme fonksiyonu
  const removeItem = (index) => {
    // Ürün dizisinden, tıklanan ürünün index'ine göre filtreleme yaparak ürünü çıkar
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems); // Güncellenmiş listeyi ayarla
  };

  return (
    <div className="app-container"> {/* Uygulamanın genel container'ı */}
      <h1>Ürün Ekleme ve Silme</h1> {/* Başlık */}

      <div className="input-container"> {/* Input ve butonun bulunduğu alan */}
        <input
          type="text"
          value={inputValue} // Metin kutusunun değeri
          onChange={(e) => setInputValue(e.target.value)} // Değişiklik olduğunda input değerini güncelle
          placeholder="Ürün adı girin" // Placeholder metni
        />
        <button onClick={addItem}>Ekle</button> {/* Ekleme butonu */}
      </div>

      {/* Ürünlerin gösterildiği liste */}
      <ul className="item-list">
        {items.map((item, index) => ( // Listeyi render ediyoruz
          <li key={index} className="item"> {/* Her ürün bir liste elemanı */}
            {item} 
            <button onClick={() => removeItem(index)}>Sil</button> {/* Silme butonu */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
