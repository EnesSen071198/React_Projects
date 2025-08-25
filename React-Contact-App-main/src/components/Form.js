import { useState } from "react";
import "../App.css";

function Form({ addContact, contacts }) {
  const [form, setForm] = useState({ fullname: "", phone_number: "" });

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    addContact([...contacts, form]);

    setForm({ fullname: "", phone_number: "" });
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          name='fullname'
          placeholder='Fullname'
          onChange={onChangeInput}
          value={form.fullname}
        />
      </div>
      <div>
        <input
          name='phone_number'
          placeholder='Phone Number'
          onChange={onChangeInput}
          value={form.phone_number}
        />
      </div>
      <div>
        <button>ADD</button>
      </div>
    </form>
  );
}

export default Form;
