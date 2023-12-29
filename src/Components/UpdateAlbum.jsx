import React, { useState, useContext } from "react";
import { MyContext } from "../AlbumsContext";

const UpdateAlbum = ({ album, update }) => {
  const [albumId, setAlbumId] = useState(album.id);
  const [userId, setUserId] = useState(album.userId);
  const [albumTitle, setAlbumTitle] = useState(album.title);
  const { albums, setAlbums } = useContext(MyContext);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send Put request to the API for update(dummy request)
    try {
      await fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: albumId,
          userId: userId,
          title: albumTitle,
        }),
      });

      let albumToUpdateIndex = albums.findIndex((alb) => alb.id === album.id);
      if (albumToUpdateIndex !== -1) {
        let updatedAlbums = [...albums];
        updatedAlbums[albumToUpdateIndex] = {
          ...updatedAlbums[albumToUpdateIndex],
          title: albumTitle,
        };

        setAlbums(updatedAlbums);
      }

      // Clear the form fields
      setAlbumId("");
      setUserId("");
      setAlbumTitle("");

      alert("Album updated successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
    }
    update(false);
  };

  return (
    <form onSubmit={handleSubmit} className="formAlbum">
      <h2>Update the Album</h2>
      <br />
      <label>
        Album ID:
        <input
          type="text"
          value={albumId}
          placeholder="Enter Album Id"
          onChange={(e) => handleInputChange(e, setAlbumId)}
          required
          disabled
        />
      </label>
      <br />
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          placeholder="Enter User Id"
          onChange={(e) => handleInputChange(e, setUserId)}
          required
          disabled
        />
      </label>
      <br />
      <label>
        Album Title:
        <input
          type="text"
          value={albumTitle}
          placeholder="Enter Album Title"
          onChange={(e) => handleInputChange(e, setAlbumTitle)}
          required
        />
      </label>
      <br />
      <p>*Note: You cannot update userId and ID of the Album </p>
      <br />
      <div className="card-btns">
        <button
          className="btn red"
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            update(false);
          }}
        >
          Discard
        </button>
        <button className="btn green" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateAlbum;
