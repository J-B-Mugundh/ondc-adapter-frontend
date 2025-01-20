import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { useCart } from "./CartContext";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Helper function to extract the id from the description field
// Helper function to extract the product ID
const getProductId = (product) => {
    // Check if the sellerPlatform is "Saleor"
    if (product.sellerPlatform === "Saleor") {
      // Use the first variant ID if available
      return product.variants && product.variants[0] && product.variants[0].id
        ? product.variants[0].id
        : null;
    }

    if(product.sellerPlatform === "shopify"){
      return product.id;
    }

    if(product.sellerPlatform === "woocommerce"){
      return product.id;
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

const Cart = () => {
  const { cart, removeFromCart, increaseAmount, decreaseAmount } = useCart();

  // Helper function to calculate the total price
  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) =>
        acc + (item.price?.amount || 0) * (item.amount || 1),
      0
    ).toFixed(2);
  };

  useEffect(() => {
    console.log(cart);
  },[cart]);

  const handleCheckout = async () => {
    // Prepare the products data to send to the API
    const productsToSend = cart.map((item) => {

      switch (item.sellerPlatform) {
        case "shopify":
          return {
            platform: "shopify",
            product_id: item.id,
            quantity: item.amount,
           shopdomainLink: item.shopLink, 
            shopifyAccessToken: item.accessKey
          }

      case "Saleor":
      {// Extract the first variant ID from the variants array
      const variantId = item.variants && item.variants.length > 0 ? item.variants[0].id : null;
      
      // Extract necessary data
      const saleorUrl = item.shopUrl;
      const authToken = item.authToken;
    //   const saleorUrl = "https://store-itll3hh6.saleor.cloud";
    //   const authToken = "0rHFQdjk2q7P7T7yJGip1MKg4HzuNp";
      const quantity = item.amount || 1;  // Default to 1 if amount is not available
      
      // Validate if all required fields are available
      if (!variantId || !saleorUrl || !authToken || !quantity) {
        console.error("Missing required data for product:", item);
        alert("Please ensure all fields are filled correctly.");
        return null; // Return null if any required data is missing
      }
  
      // Call backend API for each product
      return {
        platform: "saleor",
        variantId,      // The variant ID of the product
        quantity,       // The quantity of the product
        saleorUrl,      // The shop URL
        authToken,      // The authorization token
      };}

      /*case "woocommerce":{

        // product_id, shopLink, consumerKey, consumerSecret, quantity: wooQuantity
        return{
          product_id : item.id,
           shopLink: item.shopLink ,
            consumerKey : item.consumerKey,
             consumerSecret : item.consumerSecret,
              quantity: item.amount,
              platform: "woocommerce",
        }

      }*/
    }
    }).filter(product => product !== null);  // Filter out null values in case of missing data
  
    // Log the final product data to be sent
    console.log("Products to send:", productsToSend);
  
    // Proceed with the API call only if products data is valid
    if (productsToSend.length === 0) {
      alert("There is no valid data to send.");
      return;
    }
  
    try {
      // Send each product's data as individual requests
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ondc/cart`, {platforms:productsToSend});
      // Process responses
      console.log("API Response:", response);
      
      if (response.status === 200) {
        toast.success("Product placed successfully!");
      } else {
        toast.error(`Failed to place the product order. Error: ${response.message}`);
      }
      
  
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };
  
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/ondc/search" className="text-blue-500 underline">
            Go Shopping!
          </Link>
        </p>
      ) : (
        <div>
          {cart.map((item) => {
            // Extract the id from the item using getProductId
            const productId = getProductId(item);

            return (
              <div
                key={productId}  // Use the extracted id as the key
                className="flex gap-x-4 py-4 px-6 border-b border-gray-200 w-full font-light text-gray-500 items-center"
              >
                {/* Product Image */}
                <div className="w-[80px] h-[80px] flex-shrink-0">
                  {item.images && item.images[0] ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item.images[0]}
                      alt={item.name || "Product"}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    {/* Title */}
                    <h2 className="text-sm font-medium text-gray-700">
                      {item.name || "Unnamed Product"}
                    </h2>
                    {/* Remove Icon */}
                    <IoMdClose
                      className="text-gray-500 hover:text-red-500 transition cursor-pointer"
                      onClick={() => removeFromCart(item)} // Pass entire item to remove
                    />
                  </div>

                  {/* Seller and Platform */}
                  <p className="text-sm text-gray-500">
                    Seller: {item.sellerName || "Unknown"} | Platform:{" "}
                    {item.sellerPlatform || "Unknown"}
                  </p>

                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded w-[120px]">
                      <button
                        onClick={() => decreaseAmount(item)} // Pass entire item to decrease
                        className="flex-1 py-1 text-center text-gray-600 hover:bg-gray-200"
                      >
                        <IoMdRemove />
                      </button>
                      <span className="flex-1 py-1 text-center">
                        {item.amount || 0}
                      </span>
                      <button
                        onClick={() => increaseAmount(item)} // Pass entire item to increase
                        className="flex-1 py-1 text-center text-gray-600 hover:bg-gray-200"
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                    {/* Total Price */}
                    <div className="text-primary font-medium">
                      {(item.price?.amount * (item.amount || 1)).toFixed(2)}{" "}
                      {item.price?.currency || "$"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Cart Total */}
          <div className="mt-6 text-right font-bold text-lg">
            Total:{" "}
            {calculateTotal()}{" "}
            {cart[0]?.price?.currency || "$"}
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Checkout
            </button>
          </div>
          
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
