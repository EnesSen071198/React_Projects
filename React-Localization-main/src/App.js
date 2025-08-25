import "./App.css";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useState } from "react";

const messages = {
  "tr-TR": {
    title: "Merhaba ",
    description:
      "Benim adım Enes, Elektrik Elektronik Mühendisi ve yazılımcıyım. Tanıştığıma memnun oldum.",
    extraInfo:
      "TEKNOFEST 2024 finalisti URAZ Model Uydu Takımı'nın yazılım sorumlusuyum. Raspberry Pi Pico kullanarak sensörlerden veri çekiyorum.",
    work: "Varaka'da çalıştım ve Papara'da staj için başvurdum. Yazılımda React ve React Native üzerinde yoğunlaşıyorum.",
    futureGoals:
      "Yapay öğrenme, Python ve React konularında kendimi geliştirmeye devam ediyorum."
  },
  "en-US": {
    title: "Hello ",
    description:
      "My name is Enes, I am an Electrical and Electronics Engineer and software developer. Nice to meet you.",
    extraInfo:
      "I am the software leader of the URAZ Model Satellite Team, which is a finalist in TEKNOFEST 2024. I use Raspberry Pi Pico to collect data from sensors.",
    work: "I worked at Varaka and applied for an internship at Papara. I am focusing on React and React Native in software development.",
    futureGoals:
      "I continue to improve myself in machine learning, Python, and React."
  }
};

function App() {
  const [lang, setLang] = useState("tr-TR");

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s"
  };

  return (
    <div className='App'>
      <IntlProvider messages={messages[lang]}>
        <span style={{ fontSize: 50 }}>
          <FormattedMessage id='title' />
        </span>
        <br /> <br />
        <span style={{ fontSize: 30 }}>
          <FormattedMessage id='description' />
        </span>
        <br /> <br />
        <span style={{ fontSize: 20 }}>
          <FormattedMessage id='extraInfo' />
        </span>
        <br /> <br />
        <span style={{ fontSize: 20 }}>
          <FormattedMessage id='work' />
        </span>
        <br /> <br />
        <span style={{ fontSize: 20 }}>
          <FormattedMessage id='futureGoals' />
        </span>
        <br /> <br />
        <button style={buttonStyle} onClick={() => setLang("tr-TR")}>
          TR
        </button>
        <button style={buttonStyle} onClick={() => setLang("en-US")}>
          EN
        </button>
      </IntlProvider>
    </div>
  );
}

export default App;
