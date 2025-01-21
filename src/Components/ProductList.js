import React, { useEffect } from "react";
import { useCart } from "./CartContext";

// Helper function to extract the product ID
const getProductId = (product) => {
  if (product.sellerPlatform === "shopify") {
    return product.id;
  }

  // Check if the sellerPlatform is "Saleor"
  if (product.sellerPlatform === "Saleor") {
    // Use the first variant ID if available
    return product.variants && product.variants[0] && product.variants[0].id
      ? product.variants[0].id
      : null;
  }

  // Fallback: Parse description field for the ID
  try {
    const blocks = JSON.parse(product.description)?.blocks;
    return blocks && blocks[0] && blocks[0].id ? blocks[0].id : null;
  } catch (error) {
    console.error("Error parsing product description:", error);
    return null;
  }
};

const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  const EXCHANGE_RATE_TO_INR = 82.5; // Static exchange rate to INR

  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Extract the id from the product's description field
        const productId = product.sellerPlatform === "shopify" ? product.id : getProductId(product);

        // Convert price to INR
        const priceInINR = product.price?.amount
          ? (product.price.amount * EXCHANGE_RATE_TO_INR).toFixed(2)
          : "N/A";

        return (
          <div
            key={productId} // Use extracted id as the key
            className="border border-[#e4e4e4] rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="h-[200px] mb-4 relative overflow-hidden group">
              <div className="w-full h-full flex justify-center items-center">
                <img
                  className="max-h-[160px] group-hover:scale-110 transition duration-300"
                  src={product.images && product.images[0]}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-sm capitalize text-gray-500 mb-1">
                {product.sellerPlatform || "Unknown Platform"}
              </div>
              <h2 className="font-semibold mb-1">{product.name}</h2>
              <p className="mb-1">Seller: {product.sellerName || "Unknown"}</p>
              <p className="mb-1">
                Price: ₹{priceInINR} {/* Display price in INR */}
              </p>
            </div>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
