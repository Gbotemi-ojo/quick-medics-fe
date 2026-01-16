import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./searchbar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
        navigate(`/shop?search=${encodeURIComponent(search)}`);
    } else {
        navigate('/shop');
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search for drugs..." 
        value={search}
        onChange={handleChange} 
      />
      <button type="submit" style={{background:'none', border:'none', cursor:'pointer'}}>
        <ion-icon name="search-outline" class="search-icon"></ion-icon>
      </button>
    </form>
  );
};

export default SearchBar;
