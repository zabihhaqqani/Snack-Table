import React from 'react'

function Card({snack}) {
    const {id,product_name,product_weight,calories,price,ingredients} = snack
  return (
    <tr>
      <td>{id}</td>
      <td>{product_name}</td>
      <td>{product_weight}</td>
      <td>{price}</td>
      <td>{calories}</td>
      <td>{ingredients?.join(", ")}</td>
    </tr>
  );
}

export default Card