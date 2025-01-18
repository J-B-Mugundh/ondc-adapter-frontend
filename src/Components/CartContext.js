import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Helper function to extract the product id
  const getProductId = (product) => {
    // Assuming the first block contains the id
    const blocks = JSON.parse(product.description).blocks;
    return blocks && blocks[0] && blocks[0].id ? blocks[0].id : null;
  };

  // Add to cart function
  const addToCart = (product) => {
    const productId = getProductId(product);
    console.log("Adding product with id:", productId);

    const existingCartItem = cart.find((item) => getProductId(item) === productId);
    console.log("Existing cart item with id:", existingCartItem ? getProductId(existingCartItem) : null);

    if (existingCartItem) {
      console.log("Found existing product with id:", getProductId(existingCartItem));
      // Update the cart with new amount (quantity) if the product exists
      setCart((prevCart) =>
        prevCart.map((item) =>
          getProductId(item) === productId
            ? { ...item, amount: item.amount + 1 } // Increase the amount by 1
            : item
        )
      );
    } else {
      // Add the product to the cart if it doesn't exist
      setCart((prevCart) => [
        ...prevCart,
        { ...product, amount: 1 },
      ]);
    }
  };

  // Remove item from cart by id
  const removeFromCart = (product) => {
    const productId = getProductId(product);
    setCart((prevCart) => prevCart.filter((item) => getProductId(item) !== productId));
  };

  // Increase quantity
  const increaseAmount = (product) => {
    const productId = getProductId(product);
    setCart((prevCart) =>
      prevCart.map((item) =>
        getProductId(item) === productId
          ? { ...item, amount: item.amount + 1 } // Increase the amount by 1
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseAmount = (product) => {
    const productId = getProductId(product);
    setCart((prevCart) =>
      prevCart.map((item) =>
        getProductId(item) === productId && item.amount > 1
          ? { ...item, amount: item.amount - 1 } // Decrease the amount by 1, but not less than 1
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
