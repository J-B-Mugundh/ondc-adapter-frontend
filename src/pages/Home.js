import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import ProductList from "../Components/ProductList";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { useCart } from "../Components/CartContext"; // Import the CartContext hook
import beauty from "../images/beauty.jpeg";
import books from "../images/books.jpeg";
import clothing from "../images/clothing.jpeg";
import electronics from "../images/electronics.jpeg";
import food from "../images/food.jpeg";
import Search1 from "../images/Search1.jpg";

const Home = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart } = useCart();

  const categories = [
    { name: "Electronics", image: electronics },
    { name: "Clothing", image: clothing },
    { name: "Beauty", image: beauty },
    { name: "Books", image: books },
    { name: "Food", image: food },
  ];

  const handleSearch = async (productName) => {
    setProducts([]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ondc/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });

      const data = await response.json();
      if (response.ok) setProducts(data.products || []);
      else setError(data.message || "No products found.");
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        padding: "20px", 
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url(${Search1})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Header Section */}
      <div 
        className="relative flex justify-between items-center" 
        style={{ marginBottom: "20px" }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", flex: 1, color: "#4A2C2A" }}>
          ONDC Product Search
        </h1>
        <Link to="/cart" className="relative flex items-center">
          <BsBag className="text-3xl cursor-pointer" />
          {cart.length > 0 && (
            <div 
              className="bg-red-500 absolute -top-2 -right-2 text-[12px] w-[20px] h-[20px] text-white rounded-full flex justify-center items-center"
            >
              {cart.length}
            </div>
          )}
        </Link>
      </div>

      {/* Search Bar Section */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          margin: "20px 0",
          backgroundColor: "rgba(255, 255, 255,0.8)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div 
          style={{ 
            width: "60%", 
            maxWidth: "600px",
            
            borderRadius: "8px",
            padding: "5px",
           
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Categories Section */}
      {!products.length && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "10px", textAlign: "left" }}>
            Categories
          </h3>
          <div 
            className="categories-container"
            style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}
          >
            {categories.map((category, index) => (
              <div 
                key={index} 
                style={{ 
                  textAlign: "center", 
                  marginBottom: "20px", 
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
                <p style={{ fontWeight: "600", marginTop: "5px" }}>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <div className="loader" style={{ 
            border: "4px solid #f3f3f3", 
            borderRadius: "50%", 
            borderTop: "4px solid #4A90E2", 
            width: "30px", 
            height: "30px", 
            animation: "spin 1s linear infinite" 
          }} />
          <p style={{ color: "#FFA500", fontWeight: "bold", marginTop: "10px" }}>Loading...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Product List */}
      {products.length > 0 && <ProductList products={products} />}
    </div>
  );
};

export default Home;
