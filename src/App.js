import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.js';
import AlbumList from './pages/AlbumList.js';
import NewAlbum from './pages/NewAlbum.js';
import Users from './pages/users';
import Login from './pages/Login';
import UserFields from './pages/userFileds';
import Footer from './components/Footer.js';
import axios from 'axios';
import ShoppingCart from './pages/ShoppingCart.js';

function App() {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "Álbum 1",
      artist: "Artista 1",
      genre: "Rock",
      price: 199.99,
      stock: 10,
      image: "https://media.istockphoto.com/id/1308631663/es/foto/banda-de-m%C3%BAsica-rock-actuando-con-guitarrista-femenina-baterista-y-cantante-masculino.jpg?s=612x612&w=0&k=20&c=vjt7ms21rAw6zDsQctb8SreHGgu9rC_ER7pGY7hxhYQ="
    },
    {
      id: 2,
      title: "Álbum 2",
      artist: "Artista 2",
      genre: "Pop",
      price: 149.99,
      stock: 5,
      image: "https://www.clarin.com/2021/12/28/Ky0b4DU5C_360x240__1.jpg"
    }
  ]);


  // Agregar álbum (puedes agregar un POST si tienes backend)
  const handleAddAlbum = (album) => {
    setAlbums([...albums, { ...album, id: albums.length + 1 }]);
  };

  // Eliminar álbum
  const deleteAlbum = (id) => {
    setAlbums(albums.filter(album => album.id !== id));
  };

  // Editar álbum (opcional, si implementas edición)
  const handleEditAlbum = (editedAlbum) => {
    setAlbums(albums.map(album =>
      album.id === editedAlbum.id ? editedAlbum : album
    ));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Router>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <AlbumList
                  albumsList={albums}
                  onDelete={deleteAlbum}
                  onEdit={handleEditAlbum}
                />
              }
            />
            <Route path="/new" element={<NewAlbum onAdd={handleAddAlbum} />} />
            <Route path="/cart" element={<ShoppingCart albums={albums} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userfields" element={<UserFields />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;