import './App.css';
import {Home} from './components/Home';
import {Route,Routes} from 'react-router-dom'
import {Menü} from './components/Menü';
import {AboutUs} from './components/AboutUs';
import {Contact} from './components/Contact';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
         <Route path='/' exact element={<Home/>}/>
         <Route path='/Menü' exact element={<Menü/>}/>
         <Route path='/About' exact element={<AboutUs/>}/>
         <Route path='/Contact' exact element={<Contact/>}/>
         <Route path='/' exact element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
