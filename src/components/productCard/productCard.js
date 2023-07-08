import React, { useState } from "react";
import { snacks } from "../../data";
import Card from "./card";

function ProductCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(snacks);
  const [sortOrder, setSortOrder] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value);

    const results = snacks.filter(
      (snack) =>
        snack?.product_name
          .toLowerCase()
          .includes(event?.target?.value.toLowerCase()) ||
        snack?.ingredients?.some((ingredient) =>
          ingredient.toLowerCase().includes(event?.target?.value.toLowerCase())
        )
    );

    setSearchResults(results);
  };

  const handleSort = () => {
    const sortedData = [...searchResults];
    sortedData.sort((a, b) => (sortOrder ? a.id - b.id : b.id - a.id));
    setSearchResults(sortedData);
  };

  const handlePriceSort = () => {
    const sortedData = [...searchResults];
    sortedData.sort((a, b) => {
      if (sortOrder) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSearchResults(sortedData);
  };

  const handleNameSort = () => {
    const sortedResults = [...searchResults];
    sortedResults.sort((a, b) => {
      const nameA = a.product_name.toLowerCase();
      const nameB = b.product_name.toLowerCase();

      if (sortOrder) {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      }
    });
    setSearchResults(sortedResults);
  };
  const handleProductWeightSort = () => {
    const sortedResults = [...searchResults];
    sortedResults.sort((a, b) => {
      if (sortOrder) {
        return (
          Number(a.product_weight.slice(0, -1)) -
          Number(b.product_weight.slice(0, -1))
        );
      } else {
        return (
          Number(b.product_weight.slice(0, -1)) -
          Number(a.product_weight.slice(0, -1))
        );
      }
    });
    setSearchResults(sortedResults);
  };
  const handleCalorieSort = () => {
    const sortedData = [...searchResults];
    sortedData.sort((a, b) => {
      if (sortOrder) {
        return a.calories - b.calories;
      } else {
        return b.calories - a.calories;
      }
    });
    setSearchResults(sortedData);
  };

  const handleIngredientsSort = () => {
    const sortedResults = [...searchResults];
    sortedResults.sort((a, b) => {
      const firstIngredientA = a.ingredients[0].toLowerCase();
      const firstIngredientB = b.ingredients[0].toLowerCase();
     return sortOrder
        ? firstIngredientA.localeCompare(firstIngredientB)
        : firstIngredientB.localeCompare(firstIngredientA);
    });
    setSearchResults(sortedResults);
  };
  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        value={searchTerm}
        placeholder="Search with Products or Ingredients"
      />
      <table>
        <tr>
          <th
            onClick={() => {
              handleSort();
              setSortOrder((sortOrder) => !sortOrder);
            }}
          >
            ID ⇅
          </th>
          <th
            onClick={() => {
              handleNameSort();
              setSortOrder((sortOrder) => !sortOrder);
            }}
          >
            Product Name ⇅
          </th>
          <th
            onClick={() => {
              handleProductWeightSort();
              setSortOrder((sortOrder) => !sortOrder);
            }}
          >
            Product Weight ⇅
          </th>
          <th
            onClick={() => {
              handlePriceSort();
              setSortOrder((sortOrder) => !sortOrder);
            }}
          >
            Price (INR) ⇅
          </th>
          <th
            onClick={() => {
              handleCalorieSort();
              setSortOrder((sortOrder) => !sortOrder);
            }}
          >
            Calories ⇅
          </th>
          <th
            onClick={() => {
              handleIngredientsSort();
              setSortOrder((sortOrder) => !sortOrder);
            }}
          >
            Ingredients ⇅
          </th>
        </tr>

        {searchResults.map((item) => {
          return <Card key={item.id} snack={item ?? []} />;
        })}
      </table>
    </div>
  );
}

export default ProductCard;
