import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.js';
import AlbumList from './pages/AlbumList.js';
import NewAlbum from './pages/NewAlbum.js';
import Footer from './components/Footer.js'; // <-- Importa el Footer
import axios from 'axios';

function App() {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "Álbum 1",
      artist: "Artista 1",
      genre: "Rock",
      price: 199.99,
      stock: 10,
      image: "https://via.placeholder.com/320x200?text=Álbum+1"
    },
    {
      id: 2,
      title: "Álbum 2",
      artist: "Artista 2",
      genre: "Pop",
      price: 149.99,
      stock: 5,
      image: "https://via.placeholder.com/320x200?text=Álbum+2"
    }
  ]);

  useEffect(() => {
    axios.get('https://api.example.com/albums')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  const handleAddAlbum = (album) => {
    setAlbums([...albums, { ...album, id: albums.length + 1 }]);
  };

  const deleteAlbum = (id) => {
    axios.delete(`https://api.example.com/albums/${id}`)
      .then(() => {
        setAlbums(albums.filter(album => album.id !== id));
      })
      .catch(error => console.error('Error deleting album:', error));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AlbumList albumsList={albums} onDelete={deleteAlbum} />} />
        <Route path="/new" element={<NewAlbum onAdd={handleAddAlbum} />} />
      </Routes>
      <Footer /> {/* <-- Agrega el Footer aquí */}
    </Router>
  );
}

export default App;