import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;