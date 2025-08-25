import React from "react";
import "./App.css";
import SignUp from "./components/SignUp"; // SignUp bileşenini import et

function App() {
  return (
    <div className='App'>
      <h1>Sign Up Form</h1>
      <SignUp /> {/* SignUp bileşenini burada kullan */}
    </div>
  );
}

export default App;
