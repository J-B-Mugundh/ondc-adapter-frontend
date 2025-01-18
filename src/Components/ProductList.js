import React from "react";

const ProductList = ({ products }) => {
  // Ensure products is an array
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
          }}
        >
          <img
            src={product.images && product.images[0]}
            alt={product.name}
            style={{ width: "100%", height: "150px", objectFit: "cover" }}
          />
          <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{product.name}</h3>
          <p style={{ margin: "5px 0" }}>
            Seller: <strong>{product.sellerName}</strong>
          </p>
          <p style={{ margin: "5px 0" }}>
            Platform: <strong>{product.sellerPlatform}</strong>
          </p>
          <p style={{ margin: "5px 0" }}>
            Price: <strong>{product.price?.amount || "N/A"} {product.price?.currency || ""}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
