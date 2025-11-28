import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseURL";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again!</Box>;
  }

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid
              sx={{ marginLeft: "auto", marginRight: "auto" }}
              minWidth={"30%"}
            >
              <ProductCard {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
