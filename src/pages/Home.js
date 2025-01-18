import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import ProductList from "../Components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]); // State to store product results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the search request
  const handleSearch = async (productName) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ondc/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (response.ok) {
        setProducts(data.products || []);
      } else {
        console.error(data.message || "No products found.");
        setError(data.message || "No products found.");
        setProducts([]);
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
    

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>ONDC Product Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ProductList products={products} />
    </div>
  );
};

export default Home;
