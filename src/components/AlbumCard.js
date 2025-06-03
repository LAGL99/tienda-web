import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  width: 320px;
  text-align: center;
  background-color: #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px 18px;
  margin: 5px 4px;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background-color: #bdc3c7;
  color: #333;
  &:hover {
    background-color: #95a5a6;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  text-align: left;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const AlbumCard = ({ album, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAlbum, setEditedAlbum] = useState(album);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAlbum({ ...editedAlbum, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedAlbum);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAlbum(album);
    setIsEditing(false);
  };

  return (
    <Card>
      {isEditing ? (
        <Form onSubmit={handleSubmit}>
          <Label>Título</Label>
          <Input
            name="title"
            value={editedAlbum.title}
            onChange={handleChange}
            required
          />

          <Label>Artista</Label>
          <Input
            name="artist"
            value={editedAlbum.artist}
            onChange={handleChange}
            required
          />

          <Label>Género</Label>
          <Input
            name="genre"
            value={editedAlbum.genre}
            onChange={handleChange}
            required
          />

          <Label>Precio</Label>
          <Input
            type="number"
            step="0.01"
            name="price"
            value={editedAlbum.price}
            onChange={handleChange}
            required
          />

          <Label>Stock</Label>
          <Input
            type="number"
            name="stock"
            value={editedAlbum.stock}
            onChange={handleChange}
            required
          />

          <Label>Imagen (URL)</Label>
          <Input
            type="url"
            name="image"
            value={editedAlbum.image}
            onChange={handleChange}
            placeholder="https://example.com/portada.jpg"
          />

          <Button type="submit">Guardar</Button>
          <CancelButton type="button" onClick={handleCancel}>
            Cancelar
          </CancelButton>
        </Form>
      ) : (
        <div>
          <AlbumImage
            src={album.image || "https://via.placeholder.com/320x200?text=No+Image"}
            alt={album.title}
          />
          <h3>{album.title}</h3>
          <p>Artista: {album.artist}</p>
          <p>Género: {album.genre}</p>
          <p>Precio: ${album.price}</p>
          <p>Stock: {album.stock}</p>
          <Button onClick={() => onDelete(album._id)}>Eliminar</Button>
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        </div>
      )}
    </Card>
  );
};

export default AlbumCard;