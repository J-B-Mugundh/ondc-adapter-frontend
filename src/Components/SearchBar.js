import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue); // Trigger the search with the input value
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search for a product..."
        value={inputValue}
        onChange={handleInputChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
