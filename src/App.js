import React, { useContext, useState, useEffect } from "react";
import Albums from "./Components/Albums";
import "./App.css";
import { MyContext } from "./AlbumsContext";
import AddAlbum from "./Components/AddAlbum";

const App = () => {
  const { setAlbums } = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  // console.log(albums);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlbums();
  }, [setAlbums]);
  return (
    <div className="app">
      <h1>My Album Collection</h1>
      <button className="btn" onClick={() => setShowForm(true)}>
        Add Album
      </button>
      {showForm && <AddAlbum hide={setShowForm} />}
      <Albums />
    </div>
  );
};

export default App;
