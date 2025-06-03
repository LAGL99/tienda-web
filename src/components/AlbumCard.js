import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 18px;
  padding: 24px 18px 18px 18px;
  margin: 24px 16px;
  width: 340px;
  background: #fff;
  box-shadow: 0 6px 32px rgba(44, 62, 80, 0.12), 0 1.5px 4px rgba(44, 62, 80, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s, box-shadow 0.18s;
  position: relative;

  &:hover {
    transform: translateY(-6px) scale(1.025);
    box-shadow: 0 12px 40px rgba(44, 62, 80, 0.18), 0 2px 8px rgba(44, 62, 80, 0.12);
  }
`;

const AlbumImage = styled.img`
  width: 100%;
  max-width: 260px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
  box-shadow: 0 2px 12px rgba(44, 62, 80, 0.10);
  background: #f6f6f6;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.35rem;
  color: #22223b;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Artist = styled.p`
  margin: 0 0 4px 0;
  color: #4a4e69;
  font-weight: 500;
  font-size: 1.05rem;
`;

const Genre = styled.p`
  margin: 0 0 10px 0;
  color: #9a8c98;
  font-size: 0.98rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0 16px 0;
`;

const Price = styled.span`
  color: #0077cc;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Stock = styled.span`
  color: #22223b;
  font-size: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #22223b;
  color: white;
  padding: 8px 22px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background-color: #4a4e69;
    transform: translateY(-2px) scale(1.04);
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
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  text-align: left;
  margin-bottom: 2px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Notification = styled.div`
  position: absolute;
  top: 12px;
  right: 18px;
  background: #4aee88;
  color: #22223b;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(44,62,80,0.10);
  z-index: 2;
  animation: fadeInOut 2s;
  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const AlbumCard = ({ album, onEdit, onDelete, onBuy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAlbum, setEditedAlbum] = useState(album);
  const [showNotif, setShowNotif] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAlbum({ ...editedAlbum, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...editedAlbum,
      price: parseFloat(editedAlbum.price),
      stock: parseInt(editedAlbum.stock)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAlbum(album);
    setIsEditing(false);
  };

  const handleBuyClick = () => {
    onBuy(album);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1500);
  };

  return (
    <Card>
      {showNotif && <Notification>Se agregó al carrito</Notification>}
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
            required
          />
          <ButtonRow>
            <Button type="submit">Guardar</Button>
            <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
          </ButtonRow>
        </Form>
      ) : (
        <>
          <AlbumImage
            src={album.image || "https://via.placeholder.com/320x200?text=No+Image"}
            alt={album.title}
          />
          <Title>{album.title}</Title>
          <Artist>Artista: {album.artist}</Artist>
          <Genre>Género: {album.genre}</Genre>
          <InfoRow>
            <Price>${album.price}</Price>
            <Stock>Stock: {album.stock}</Stock>
          </InfoRow>
          <ButtonRow>
            <Button onClick={() => onDelete(album.id)}>Eliminar</Button>
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
            <Button onClick={handleBuyClick}>Comprar</Button>
          </ButtonRow>
        </>
      )}
    </Card>
  );
};

export default AlbumCard;