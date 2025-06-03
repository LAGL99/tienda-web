import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash, FaPlus, FaShareAlt } from "react-icons/fa";

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start; // <-- Alinea arriba ambos contenedores
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CartSection = styled.div`
  flex: 2;
  min-width: 340px;
`;

const CartTitle = styled.h2`
  text-align: center;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #232b36;
  border-radius: 10px;
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.18);
    transform: translateY(-8px) scale(1.03);
  }
`;

const AlbumRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const AlbumImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

const AlbumInfo = styled.div`
  flex: 1;
`;

const AlbumTitle = styled.div`
  font-weight: bold;
  color: #fff;
`;

const AlbumArtist = styled.div`
  color: #bbb;
  font-size: 0.95rem;
`;

const AlbumPrice = styled.div`
  font-weight: bold;
  color: #4fc3f7;
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.2rem;
  margin-top: 0.7rem;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  transition: background 0.2s;
  &:hover {
    background: #34495e;
  }
`;

const RemoveBtn = styled(ActionBtn)`
  color: #e74c3c;
  &:hover {
    background: #e74c3c22;
  }
`;

const ShareBtn = styled(ActionBtn)`
  color: #4fc3f7;
  &:hover {
    background: #4fc3f722;
  }
`;

const QuantityBtn = styled(ActionBtn)`
  color: #2ecc40;
  font-size: 1.1rem;
`;

const SummarySection = styled.div`
  flex: 1;
  min-width: 260px;
  background: #232b36; // <-- Igual que CartItem
  border-radius: 10px;
  padding: 2rem 1.5rem;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  display: flex;
  flex-direction: column;
  color: #fff; // Texto blanco para contraste
  margin-top: 4.3rem; // <-- Agrega esta línea para separar del top
`;

const SummaryTitle = styled.h3`
  margin-bottom: 1rem;
  color: #fff; // Título blanco
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  color: #4fc3f7; // Igual que el precio de los álbumes
`;

const PayBtn = styled.button`
  background: #2980b9;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.2s;
  &:hover {
    background: #1a5a85;
  }
`;


const staticCart = [
  {
    id: 1,
    title: "Álbum 1",
    artist: "Artista 1",
    price: 199.99,
    image: "https://i.scdn.co/image/ab67616d0000b273005ee342f4eef2cc6e8436ab",
    quantity: 1
  },
  {
    id: 2,
    title: "Álbum 2",
    artist: "Artista 2",
    price: 149.99,
    image: "https://i.scdn.co/image/ab67616d0000b273548f7ec52da7313de0c5e4a0",
    quantity: 2
  },
  {
    id: 3,
    title: "Álbum 3",
    artist: "Artista 3",
    price: 199.99,
    image: "https://i.scdn.co/image/ab67616d0000b273bbd45c8d36e0e045ef640411",
    quantity: 1
  },
  {
    id: 4,
    title: "Álbum 4",
    artist: "Artista 4",
    price: 149.99,
    image: "https://i.scdn.co/image/ab67616d00001e0272d0efdc962fe7a710bffd21",
    quantity: 2
  }
];

const total = staticCart.reduce((sum, album) => sum + album.price * album.quantity, 0);

const ShoppingCart = () => {
    const [cart, setCart] = useState(staticCart);

    // Eliminar un álbum del carrito
    const handleRemove = (id) => {
      setCart(cart.filter(album => album.id !== id));
    };

    // Aumentar la cantidad de un álbum
    const handleIncrease = (id) => {
      setCart(cart.map(album =>
        album.id === id ? { ...album, quantity: album.quantity + 1 } : album
      ));
    };

    // Compartir (ejemplo: copiar info al portapapeles)
    const handleShare = (album) => {
      const text = `¡Mira este álbum! ${album.title} de ${album.artist} por $${album.price}`;
      navigator.clipboard.writeText(text);
      alert("¡Álbum copiado al portapapeles!");
    };

    const total = cart.reduce((sum, album) => sum + album.price * album.quantity, 0);

  return (
    <Container>
      <CartSection>
        <CartTitle>Shopping Cart</CartTitle>
        <CartList>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(album => (
              <CartItem key={album.id}>
                <AlbumRow>
                  <AlbumImg src={album.image} alt={album.title} />
                  <AlbumInfo>
                    <AlbumTitle>{album.title}</AlbumTitle>
                    <AlbumArtist>{album.artist}</AlbumArtist>
                    <AlbumPrice>${album.price} x {album.quantity}</AlbumPrice>
                  </AlbumInfo>
                  <RemoveBtn title="Eliminar del carrito" onClick={() => handleRemove(album.id)}>
                    <FaTrash />
                  </RemoveBtn>
                </AlbumRow>
                <ActionsRow>
                  <QuantityBtn title="Aumentar cantidad" onClick={() => handleIncrease(album.id)}>
                    <FaPlus />
                  </QuantityBtn>
                  <ActionBtn onClick={() => handleRemove(album.id)}>Eliminar</ActionBtn>
                  <ShareBtn title="Compartir" onClick={() => handleShare(album)}>
                    <FaShareAlt />
                  </ShareBtn>
                </ActionsRow>
              </CartItem>
            ))
          )}
        </CartList>
      </CartSection>
      <SummarySection>
        <CartTitle>Resumen</CartTitle>
        <SummaryTitle>Detalles de compra</SummaryTitle>
        <TotalRow>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </TotalRow>
        <PayBtn>Pagar</PayBtn>
      </SummarySection>
    </Container>
  );
};

export default ShoppingCart;