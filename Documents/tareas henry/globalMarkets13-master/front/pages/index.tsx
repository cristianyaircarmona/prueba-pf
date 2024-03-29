import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title={"Global-Market - Home"}
      pageDescription={"Encuentra los mejores productos de Global Market"}>
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};
export default HomePage;
