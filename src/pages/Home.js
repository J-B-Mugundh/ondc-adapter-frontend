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

const Home = () => {
  const [products, setProducts] = useState([]); // State to store product results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart } = useCart(); // Access the cart from CartContext

  // Mock categories
  const categories = [
    { name: "Electronics", image: electronics },
    { name: "Clothing", image: clothing },
    { name: "Beauty", image: beauty },
    { name: "Books", image: books },
    { name: "Food", image: food },
  ];

  // Mock filter options
  const sortOptions = ["Price Low to High", "Price High to Low", "Top Rated", "Newest Arrivals"];
  const filterOptions = ["Brand", "Color", "Size", "Material", "Rating", "Discount"];
  const priceRanges = ["Under $50", "$50 - $100", "$100 - $200", "Above $200"];

  
  const handleSearch = async (productName) => {
    // Clear previous search results
    setProducts([]);
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
      {/* Header Section */}
      <div className="relative flex justify-between items-center" style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", flex: 1, color: "#4A90E2" }}>
          ONDC Product Search
        </h1>
        <Link to="/cart" className="relative flex items-center">
          <BsBag className="text-2xl cursor-pointer" />
          {cart.length > 0 && (
            <div className="bg-red-500 absolute -top-2 -right-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {cart.length}
            </div>
          )}
        </Link>
      </div>

      {/* Categories Section */}
      {!products.length && (
        <div>
          <div className="categories-section" style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "10px", textAlign: "left" }}>
              Categories
            </h3>
            <div
              className="categories-container"
              style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}
            >
              {categories.map((category, index) => (
                <div key={index} style={{ textAlign: "center", marginBottom: "20px" }}>
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
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <div style={{ width: "60%", maxWidth: "600px" }}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <div className="loader" style={{ border: "4px solid #f3f3f3", borderRadius: "50%", borderTop: "4px solid #4A90E2", width: "30px", height: "30px", animation: "spin 1s linear infinite" }} />
          <p style={{ color: "#FFA500", fontWeight: "bold", marginTop: "10px" }}>Loading...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Product List */}
      {products.length > 0 && (
        <div>
          {/* Filters Section */}
          <div className="filters-section" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div className="filter-item" style={{ marginBottom: "10px", flexBasis: "22%" }}>
              <label htmlFor="sort" style={{ marginRight: "10px" }}>Sort By:</label>
              <select id="sort" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }}>
                {sortOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-item" style={{ marginBottom: "10px", flexBasis: "22%" }}>
              <label htmlFor="filter" style={{ marginRight: "10px" }}>Filter By:</label>
              <select id="filter" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }}>
                {filterOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-item" style={{ marginBottom: "10px", flexBasis: "22%" }}>
              <label htmlFor="price" style={{ marginRight: "10px" }}>Price Range:</label>
              <select id="price" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }}>
                {priceRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="filter-item" style={{ marginBottom: "10px", flexBasis: "22%" }}>
              <label htmlFor="rating" style={{ marginRight: "10px" }}>Rating:</label>
              <select id="rating" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ddd", width: "100%" }}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating} Stars</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product List */}
          <ProductList products={products} />
        </div>
      )}
    </div>
  );
};

export default Home;
