import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NewAlbum = ({ onAdd }) => {
  const [album, setAlbum] = useState({
    title: "",
    artist: "",
    genre: "",
    price: "",
    stock: "",
    coverImage: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...album,
      price: parseFloat(album.price),
      stock: parseInt(album.stock)
    });
    navigate("/");
  };

  return (
    <FormContainer>
      <Title>🎶 Nuevo Álbum</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Título</Label>
          <Input value={album.title} onChange={(e) => setAlbum({ ...album, title: e.target.value })} required />
        </FormGroup>
        <FormGroup>
          <Label>Artista</Label>
          <Input value={album.artist} onChange={(e) => setAlbum({ ...album, artist: e.target.value })} required />
        </FormGroup>
        <FormGroup>
          <Label>Género</Label>
          <Input value={album.genre} onChange={(e) => setAlbum({ ...album, genre: e.target.value })} required />
        </FormGroup>
        <FormGroup>
          <Label>Precio</Label>
          <Input
            type="number"
            step="0.01"
            value={album.price}
            onChange={(e) => setAlbum({ ...album, price: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Stock</Label>
          <Input
            type="number"
            value={album.stock}
            onChange={(e) => setAlbum({ ...album, stock: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>URL de la imagen de portada</Label>
          <Input value={album.coverImage} onChange={(e) => setAlbum({ ...album, coverImage: e.target.value })} required />
        </FormGroup>
        <Button type="submit">Guardar álbum</Button>
      </form>
    </FormContainer>
  );
};

export default NewAlbum;

// Styled-components
const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background-color: #0077cc;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;