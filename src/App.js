import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [random, setRandom] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData2 = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        "https://api.unsplash.com/photos/random?client_id=h9K7vIze25yvNLy_l90a5fbOLzSknyCxgTpfanowqs0"
      );
      setRandom(response.data.urls.full);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=h9K7vIze25yvNLy_l90a5fbOLzSknyCxgTpfanowqs0`
      );
      setImages(response.data.results);
    };
 
   fetchData();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(
      e.target.value
    );
  };
  const handleButtonClick = () => {
    fetchData2();
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h1 className="mt-2">Snap Quest</h1>
        <input
          className="rounded mt-1 fw-500 text-light p-3 bg-secondary bg-opacity-15"
          style={{ height: "2rem" }}
          type="text"
          onChange={handleSearch}
          value={searchTerm}
          placeholder="search for images.."
        />
      </div>

      <div className="d-flex flex-column align-items-center m-3">
        <p className="text-light">Click for Random Image</p>
        <button
        type="button"
          className="btn btn-dark pb-1"
          data-bs-toggle="button" 
          autoComplete="off"
          style={{ width: "8rem", height: "2rem" }}
          onClick={handleButtonClick}
        >
          Click Me
        </button>
        {loading && <div className="text-light">Loading...</div>}
        {random && (<img
          src={random}
          alt="img"
          className="rounded"
          style={{ width: "12rem", height: "10rem", margin:'2rem' }}
        />)}
      </div>
      
      {images && (<div className="col-12 d-flex justify-content-evenly flex-wrap">
      {images.map((image) => (
          <div
            className="card m-2 bg-secondary shadow-5-strong"
            style={{ width: "18rem", height: "auto" }}
            key={image.id}
          >
            <img
              className="card-img-top col-3 img-fluid m-3 d-flex justify-content-center rounded"
              style={{ width: "8rem", height: "auto" }}
              src={image.urls.raw}
              alt={image.alt_description}
            />
            <div className="card-body">
              <p className="username fw-bold"> Photo by {image.user.name}</p>
              <p className="like fw-bold text-info">👍 {image.likes}</p>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default App;
