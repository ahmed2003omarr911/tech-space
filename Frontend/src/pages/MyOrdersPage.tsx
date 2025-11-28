import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography>My Orders</Typography>
      {myOrders.map(({ address, orderItems, total }) => (
        <Box sx={{ border: 1, borderColor: "#909090", borderRadius: 5, padding: 3 }}>
          <Typography>Address: {address}</Typography>
          <Typography>Items: {orderItems.length}</Typography>
          <Typography>Total: {total}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrdersPage;
