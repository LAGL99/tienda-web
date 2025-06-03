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
    image: "" // Cambiado de coverImage a image
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
      <Title>🎶 Agregar Nuevo Álbum</Title>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Título</Label>
          <Input 
            placeholder="Ejemplo: Thriller"
            value={album.title} 
            onChange={(e) => setAlbum({ ...album, title: e.target.value })}
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Artista</Label>
          <Input 
            placeholder="Ejemplo: Michael Jackson"
            value={album.artist} 
            onChange={(e) => setAlbum({ ...album, artist: e.target.value })}
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Género</Label>
          <Input 
            placeholder="Ejemplo: Pop"
            value={album.genre} 
            onChange={(e) => setAlbum({ ...album, genre: e.target.value })}
            required 
          />
        </FormGroup>
        <FormRow>
          <FormGroup style={{ flex: 1, marginRight: "1rem" }}>
            <Label>Precio</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="Ejemplo: 199.99"
              value={album.price}
              onChange={(e) => setAlbum({ ...album, price: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup style={{ flex: 1 }}>
            <Label>Stock</Label>
            <Input
              type="number"
              min="0"
              placeholder="Ejemplo: 10"
              value={album.stock}
              onChange={(e) => setAlbum({ ...album, stock: e.target.value })}
              required
            />
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label>URL de la imagen de portada</Label>
          <Input 
            placeholder="https://..."
            value={album.image} // Cambiado de coverImage a image
            onChange={(e) => setAlbum({ ...album, image: e.target.value })} // Cambiado de coverImage a image
            required 
          />
        </FormGroup>
        <Button type="submit">Guardar álbum</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default NewAlbum;

// Styled-components mejorados
const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2.5rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #0077cc;
  letter-spacing: 1px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #0077cc;
    background: #f0f8ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #22223b; // Color oscuro para combinar con la navbar
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  letter-spacing: 1px;
  transition: background 0.2s;
  &:hover {
    background-color: #4a4e69; // Un tono más claro al pasar el mouse
  }
`;