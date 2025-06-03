import styled from "styled-components";
import AlbumCard from "../components/AlbumCard";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// Álbumes de ejemplo por defecto
const defaultAlbums = [
  { id: 1, title: "Álbum 1", artist: "Artista 1", cover: "https://via.placeholder.com/150" },
  { id: 2, title: "Álbum 2", artist: "Artista 2", cover: "https://via.placeholder.com/150" },
];

const AlbumList = ({ albumsList = defaultAlbums, onDelete, onEdit }) => {
  return (
    <Container>
      {albumsList.map((album) => (
        <AlbumCard 
          key={album.id}
          album={album}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Container>
  );
};

export default AlbumList;