import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const { token } = useAuth();

  const addressRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    const address = addressRef.current?.value;

    if (!address) {
      return;
    }

    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      return;
    }

    navigate("/order-success");
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
        fullWidth
        sx={{ mt: 3 }}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          mt: 2,
          border: 1,
          borderColor: "#909090",
          borderRadius: 5,
          padding: 2,
        }}
      >
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={3}
              width="100%"
            >
              <img src={item.image} alt="product-image" width={50} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">
                  {item.quantity} × {item.unitPrice}$
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ textAlign: "right" }}>
            Total Amount: {totalAmount}$
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, borderRadius: 5 }}
        onClick={handleConfirmOrder}
      >
        Pay now
      </Button>
    </Container>
  );
};

export default CheckoutPage;
