import React from "react";
import styled from "styled-components";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  text-align: center;
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
      <IconLink href="mailto:aljaarellanoga@ittepic.edu.mx" title="Gmail">
        <FaEnvelope />
      </IconLink>
    </Icons>
  
    <div style={{marginTop: "0.5rem", fontSize: "0.9rem"}}>© 2025 Music Store</div>
  </FooterContainer>
);

export default Footer;