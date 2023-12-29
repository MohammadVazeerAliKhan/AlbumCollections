import React, { useContext, useState } from "react";
import { MyContext } from "../AlbumsContext";
import UpdateAlbum from "./UpdateAlbum";
const Card = ({ album }) => {
  const { albums, setAlbums } = useContext(MyContext);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setShowUpdate(true);
  };
  const handleDeleteAlbum = async (id, title) => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const albumsAfterDelete = albums.filter((album) => {
        if (album.id === id && album.title === title) {
          return false; // Exclude albums with matching id and title
        }
        return true; // Include other albums
      });
      setAlbums(albumsAfterDelete);
    } catch (err) {
      console.log("error in deleting request", err);
    }
  };
  return (
    <>
      {showUpdate && <UpdateAlbum album={album} update={setShowUpdate} />}
      <div className="card">
        <div className="card-body">
          <h2 className="card-id">{album.id}</h2>
          <h2 className="card-title">{album.title}</h2>
        </div>
        <div className="card-btns">
          <button className="btn green" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="btn red"
            onClick={() => handleDeleteAlbum(album.id, album.title)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
