import React, { useState } from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  max-width: 700px;
  margin: 2.5rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(44, 62, 80, 0.10);
  padding: 2.5rem 2rem;
`;

const CartTitle = styled.h2`
  text-align: center;
  color: #22223b;
  margin-bottom: 2rem;
  letter-spacing: 1px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ececec;
  padding-bottom: 1.2rem;
  gap: 1.2rem;
`;

const AlbumImage = styled.img`
  width: 90px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
  background: #f6f6f6;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const AlbumTitle = styled.div`
  font-weight: bold;
  color: #22223b;
  font-size: 1.1rem;
`;

const AlbumArtist = styled.div`
  color: #4a4e69;
  font-size: 0.98rem;
`;

const AlbumDetails = styled.div`
  color: #9a8c98;
  font-size: 0.95rem;
`;

const Quantity = styled.div`
  font-size: 1rem;
  color: #0077cc;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.1rem;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #e74c3c;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #22223b;
`;

const EmptyCart = styled.p`
  text-align: center;
  color: #9a8c98;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

const BuyButton = styled.button`
  background: #22223b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 2.2rem;
  margin: 2rem auto 0 auto;
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #4a4e69;
  }
`;

const ThankYou = styled.div`
  text-align: center;
  color: #0077cc;
  font-size: 1.3rem;
  margin-top: 2.5rem;
  font-weight: bold;
`;

const ShoppingCart = ({ cart, onRemove, onClearCart }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuy = () => {
    setShowThankYou(true);
    if (onClearCart) onClearCart(); // Vacía el carrito después de comprar
  };

  if (showThankYou) {
    return (
      <CartContainer>
        <ThankYou>¡Gracias por tu compra! 🎉</ThankYou>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>🛒 Carrito de Compras</CartTitle>
      {cart.length === 0 ? (
        <EmptyCart>Tu carrito está vacío.</EmptyCart>
      ) : (
        <>
          {cart.map(item => (
            <CartItem key={item.id}>
              <AlbumImage src={item.image} alt={item.title} />
              <AlbumInfo>
                <AlbumTitle>{item.title}</AlbumTitle>
                <AlbumArtist>Artista: {item.artist}</AlbumArtist>
                <AlbumDetails>Precio: ${item.price}</AlbumDetails>
                <Quantity>Cantidad: {item.quantity}</Quantity>
              </AlbumInfo>
              <RemoveButton onClick={() => onRemove(item.id)}>Eliminar</RemoveButton>
            </CartItem>
          ))}
          <TotalRow>Total: ${total.toFixed(2)}</TotalRow>
          <BuyButton onClick={handleBuy}>Comprar</BuyButton>
        </>
      )}
    </CartContainer>
  );
};

export default ShoppingCart;