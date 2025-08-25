import { useState } from "react";
import "../App.css";

function List({ contacts }) {
  const [filterText, setFilterText] = useState("");

  const filtered = contacts.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <div>
      <input
        placeholder='Filter Contact'
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
        }}
      />
      <ul>
        {filtered.map((contact, i) => (
          <li key={i}>
            {contact.fullname} - {contact.phone_number}{" "}
            {/* İsim ve telefon numarasını göster */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
