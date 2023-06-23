import React from "react";
import { useDataContext } from "../components/context/context";
import ProductCard from "../components/productCard/productCard";

function LandingPage() {
  return (
    <div>
      <h1>Snack Table</h1>
      <ProductCard />
    </div>
  );
}

export default LandingPage;
