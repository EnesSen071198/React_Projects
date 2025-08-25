import "./App.css";
import { useState, useEffect } from "react";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  const [contacts, setContacts] = useState([
    {
      fullname: "Enes Şen",
      phone_number: "555-0123"
    },
    {
      fullname: "Merve Yılmaz",
      phone_number: "555-0456"
    },
    {
      fullname: "Ahmet Demir",
      phone_number: "555-0789"
    },
    {
      fullname: "Elif Kaya",
      phone_number: "555-1234"
    },
    {
      fullname: "Canan Çelik",
      phone_number: "555-5678"
    }
  ]);

  useEffect(() => {}, [contacts]);

  return (
    <div className='App'>
      <List contacts={contacts} />
      <Form addContact={setContacts} contacts={contacts} />
    </div>
  );
}

export default App;
