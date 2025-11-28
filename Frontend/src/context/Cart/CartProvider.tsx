import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseURL";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user cart. Please, try again!");
          return;
        }

        const cart = await response.json();

        const cartItemsMapped = cart.items.map(
          ({
            product,
            quantity,
            unitPrice,
          }: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            product: any;
            quantity: number;
            unitPrice: number;
          }) => ({
            productId: product._id,
            title: product.title,
            image: product.image,
            quantity,
            unitPrice,
          })
        );

        setCartItems(cartItemsMapped);
        setTotalAmount(cart.totalAmount);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        console.error("Failed to add to cart!");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        console.error("Failed to parse cart data!");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        console.error("Failed to update cart!");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        console.error("Failed to parse cart data!");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeItemInCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to delete from cart!");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        console.error("Failed to parse cart data!");
        return;
      }

      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to empty the cart!");
        return;
      }

      const cart = await response.json();

      if (!cart) {
        console.error("Failed to parse cart data!");
        return;
      }

      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        removeItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
