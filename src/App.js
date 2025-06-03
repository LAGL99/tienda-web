import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.js';
import AlbumList from './pages/AlbumList.js';
import NewAlbum from './pages/NewAlbum.js';
import Footer from './components/Footer.js';
import Users from './pages/users';
import Login from './pages/Login';
import UserFields from './pages/userFileds';
import axios from 'axios';
import ShoppingCart from './pages/ShoppingCart.js';

function App() {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "YHLQMDLG",
      artist: "Bad Bunny",
      genre: "Reggaeton",
      price: 199.99,
      stock: 10,
      image: "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0"
    },
    {
      id: 2,
      title: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      genre: "Reggaeton",
      price: 149.99,
      stock: 5,
      image: "https://m.media-amazon.com/images/I/81C6LV7yNTL._UF1000,1000_QL80_.jpg"
    },
    {
      id: 3,
      title: "ÉXODO",
      artist: "Peso Pluma",
      genre: "Regional Mexicano",
      price: 149.99,
      stock: 3,
      image: "https://upload.wikimedia.org/wikipedia/en/c/c2/Peso_Pluma_-_%C3%89xodo.jpg"
    }
  ]);

  const [cart, setCart] = useState([]);
  const handleClearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    axios.get('https://api.example.com/albums')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  const handleAddAlbum = (album) => {
    setAlbums([...albums, { ...album, id: albums.length + 1 }]);
  };

  const handleEditAlbum = (editedAlbum) => {
    setAlbums(albums.map(album =>
      album.id === editedAlbum.id ? { ...editedAlbum } : album
    ));
  };

  const deleteAlbum = (id) => {
    setAlbums(albums.filter(album => album.id !== id));
  };

  // --- Carrito ---
  const handleAddToCart = (album) => {
    setCart((prevCart) => {
      const found = prevCart.find(item => item.id === album.id);
      if (found) {
        return prevCart.map(item =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...album, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (albumId) => {
    setCart(cart.filter(item => item.id !== albumId));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <AlbumList
            albumsList={albums}
            onDelete={deleteAlbum}
            onEdit={handleEditAlbum}
            onBuy={handleAddToCart}
          />
        } />
        <Route path="/new" element={<NewAlbum onAdd={handleAddAlbum} />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userfields" element={<UserFields />} />
          
        <Route path="/cart" element={
          <ShoppingCart
            cart={cart}
            onRemove={handleRemoveFromCart}
            onClearCart={handleClearCart} // <-- Nuevo prop
          />
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;