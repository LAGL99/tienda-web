import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #2c3e50; /* Dark blue */
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Brand = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #ecf0f1;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: 100%;
    background-color: #3498db;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #bdc3c7;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Brand>🎶 Music Store</Brand>
        <NavLinks>
          <StyledNavLink to="/" end>
            Album List
          </StyledNavLink>
          <StyledNavLink to="/new">
            New Album
          </StyledNavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;