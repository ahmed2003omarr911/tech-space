import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }

    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </Box>
      {cartItems.length ? (
        <Box display="flex" flexDirection="column" gap={1}>
          {cartItems.map((item) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mt: 2,
                border: 1,
                borderColor: "#909090",
                borderRadius: 5,
                padding: 2,
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={5}
              >
                <img src={item.image} alt="product-image" width={100} />
                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>
                    {item.quantity} × {item.unitPrice}$
                  </Typography>
                  <Button onClick={() => handleRemoveItem(item.productId)}>
                    Remove Item
                  </Button>
                </Box>
              </Box>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </ButtonGroup>
            </Box>
          ))}
          <Box sx={{ mt: 3 }} display="flex" justifyContent="space-between">
            <Typography variant="h5">Total Amount: {totalAmount}$</Typography>
            <Button variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mt: "150px",
            color: "gray",
            fontFamily: "monospace",
          }}
        >
          Cart is Empty!
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
