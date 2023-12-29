import React, { useState, useContext } from "react";
import { MyContext } from "../AlbumsContext";

const AddAlbum = ({ hide }) => {
  const [albumId, setAlbumId] = useState("");
  const [userId, setUserId] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const { albums, setAlbums } = useContext(MyContext);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const albumExists = albums.find((album) => album.id === parseInt(albumId));

    if (albumExists) {
      alert(
        "Album ID already exists. Please choose a different id or update the existing id."
      );
      return;
    }

    // Send POST request to the API (dummy request)
    try {
      await fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: albumId,
          userId: userId,
          title: albumTitle,
        }),
      });
      const addAlbums = [...albums, { id: albumId, userId, title: albumTitle }];
      setAlbums(addAlbums);

      // Clear the form fields
      setAlbumId("");
      setUserId("");
      setAlbumTitle("");

      alert("Album added successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
    }

    hide();
  };

  return (
    <form onSubmit={handleSubmit} className="formAlbum">
      <label>
        Album ID:
        <input
          type="text"
          value={albumId}
          placeholder="Enter Album Id"
          onChange={(e) => handleInputChange(e, setAlbumId)}
          required
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
      <div className="card-btns">
        <button
          className="btn red"
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            hide();
          }}
        >
          Discard
        </button>
        <button className="btn green" type="submit">
          Add Album
        </button>
      </div>
    </form>
  );
};

export default AddAlbum;
