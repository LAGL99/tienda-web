import React from "react";
import styled from "styled-components";
import AlbumCard from "../components/AlbumCard";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AlbumList = ({ albumsList, onDelete, onEdit }) => (
  <Container>
    {albumsList.map((album) => (
      <AlbumCard
        key={album.id}
        album={album}
        onDelete={() => onDelete(album.id)}
        onEdit={onEdit}
      />
    ))}
  </Container>
);

export default AlbumList;