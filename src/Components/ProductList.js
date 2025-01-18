import React from "react";
import { useCart } from "./CartContext";

// Helper function to extract the id from the description field
const getProductId = (product) => {
  // Assuming the first block contains the id
  const blocks = JSON.parse(product.description).blocks;
  return blocks && blocks[0] && blocks[0].id ? blocks[0].id : null;
};

const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Extract the id from the product's description field
        const productId = getProductId(product);

        return (
          <div
            key={productId}  // Use extracted id as the key
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
                Price: {product.price?.amount || "N/A"}{" "}
                {product.price?.currency || ""}
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
