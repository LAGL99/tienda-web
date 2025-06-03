import React from "react";
import styled from "styled-components";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: #fff;
  padding: 1.5rem 0;
  text-align: center;
  margin-top: 2rem;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.5rem;
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 2rem;
  transition: color 0.2s;
  &:hover {
    color: #25d366; /* WhatsApp green as highlight */
  }
`;

const Footer = () => (
  <FooterContainer>
    <Icons>
      <IconLink href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" title="WhatsApp">
        <FaWhatsapp />
      </IconLink>
      <IconLink href="https://facebook.com/empresa.ejemplo" target="_blank" rel="noopener noreferrer" title="Facebook">
        <FaFacebook />
      </IconLink>
      <IconLink href="https://instagram.com/empresa.ejemplo" target="_blank" rel="noopener noreferrer" title="Instagram">
        <FaInstagram />
      </IconLink>
      <IconLink href="mailto:contacto@empresa.com" title="Gmail">
        <FaEnvelope />
      </IconLink>
    </Icons>
    <div>Contáctanos: WhatsApp +52 123 456 7890 · Facebook/Instagram: @empresa.ejemplo · Email: contacto@empresa.com</div>
    <div style={{marginTop: "0.5rem", fontSize: "0.9rem"}}>© 2025 Music Store. Todos los derechos reservados.</div>
  </FooterContainer>
);

export default Footer;