import { useContext } from "react";
import { MyContext } from "../AlbumsContext";
import Card from "./Card";
const Albums = () => {
  const { albums } = useContext(MyContext);
  // console.log(albums);
  return (
    <div className="albumsList">
      {albums.map((album) => (
        <Card key={album.id} album={album} />
      ))}
    </div>
  );
};

export default Albums;
