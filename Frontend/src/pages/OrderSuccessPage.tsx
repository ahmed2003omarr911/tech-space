import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

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
      <CheckCircleOutline sx={{ color: "green", fontSize: "80px" }} />
      <Typography variant="h4">Order Successful!</Typography>
      <Typography>Thanks for your order! we started processing it.</Typography>
      <Button onClick={handleHome}>Back Home</Button>
    </Container>
  );
};

export default OrderSuccessPage;
