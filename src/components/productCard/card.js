import React from 'react'

function Card({snack}) {
    const {id,product_name,product_weight,calories,price,ingredients} = snack
  return (
    <>
      <td>{id}</td>
      <td>{product_name}</td>
      <td>{product_weight}</td>
      <td>{price}</td>
      <td>{calories}</td>
      <td>{ingredients?.map((item) => item)}</td>
    </>
  );
}

export default Card