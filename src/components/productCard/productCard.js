import React, { useState } from 'react'
import { snacks } from '../../data';
import Card from './card';
import { useDataContext } from '../context/context';

function ProductCard() {

  const {} = useDataContext()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(snacks);
  const [sortOrder,setSortOrder] = useState(false)
  const [sortName, setSortName] = useState(false);
  const [sortProductWeight, setSortProductWeight] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [calorieSort, setCaloriesSort] = useState(false);
  const [ingredientsSort, setIngredientsSort] = useState(false);

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
    const sortedData = [...searchResults]
    sortedData.sort((a,b)=> sortOrder?a.id-b.id:b.id-a.id)
    setSearchResults(sortedData)
  };
    const handlePriceSort = () => {
      const sortedData = [...searchResults];
      sortedData.sort((a, b) => {
        if (sortPrice) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      setSearchResults(sortedData);
    };


  const  handleNameSort = ()=> {
    const sortedResults = [...searchResults];
    sortedResults.sort((a, b) => {

      const nameA = a.product_name.toLowerCase();
      const nameB = b.product_name.toLowerCase();

      if (sortName) {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      }
    });
    setSearchResults(sortedResults)
  }
  const handleProductWeightSort = () => {
    const sortedResults = [...searchResults]
    sortedResults.sort((a, b) => {
      if (sortProductWeight) {
   

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

  }
  const handleCalorieSort = () => {
    const sortedData = [...searchResults];
    sortedData.sort((a, b) => {
      if (calorieSort) {
        return a.calories - b.calories;
      } else {
        return b.calories - a.calories;
      }
    });
    setSearchResults(sortedData);
  }

  const handleIngredientsSort = () => {
    const sortedResults = [...searchResults];

   sortedResults.sort((a, b) => {
     const firstIngredientA = a.ingredients[0].toLowerCase();
     const firstIngredientB = b.ingredients[0].toLowerCase();

     if (ingredientsSort){
       return firstIngredientA.localeCompare(firstIngredientB);

     }else {
       return firstIngredientB.localeCompare(firstIngredientA);

     }
   });

  //  console.log(sortedResults);
    setSearchResults(sortedResults);

  }
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
              setSortOrder(!sortOrder);
            }}
          >
            ID
          </th>
          <th
            onClick={() => {
              handleNameSort();
              setSortName(!sortName);
            }}
          >
            Product Name
          </th>
          <th
            onClick={() => {
              handleProductWeightSort();
              setSortProductWeight(!sortProductWeight);
            }}
          >
            Product Weight
          </th>
          <th
            onClick={() => {
              handlePriceSort();
              setSortPrice(!sortPrice);
            }}
          >
            Price (INR){" "}
          </th>
          <th
            onClick={() => {
              handleCalorieSort();
              setCaloriesSort(!calorieSort);
            }}
          >
            Calories
          </th>
          <th
            onClick={() => {
              handleIngredientsSort();
              setIngredientsSort(!ingredientsSort);
            }}
          >
            Ingredients
          </th>
        </tr>
        <tr>
          <Card snack={searchResults[0] ?? []} />
        </tr>
        <tr>
          <Card snack={searchResults[1] ?? []} />
        </tr>
        <tr>
          <Card snack={searchResults[2] ?? []} />
        </tr>
        <tr>
          <Card snack={searchResults[3] ?? []} />
        </tr>
      </table>
    </div>
  );
}

export default ProductCard