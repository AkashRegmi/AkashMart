import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products,setProducts]=useState(null);
  const [error,setError]=useState(false);
  useEffect(()=>{
     axios.get("https://dummyjson.com/products")
    .then(res=>{
      console.log(res.data.products);
      setProducts(res.data.products)
    }).catch(error=>{
      console.log("Error fetching the error",error)
      setError(true);
    })
  },[])
  if(error){
    return <div>Product not fetched</div>
  }
  if(!products){
    return <h1>Loading................</h1>
  }
  return (
    <div >
      {products.map(product=>(
        <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px' }}>
        <h3>{product.title}</h3>
        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        <p>{product.description}</p>
        <strong>Price:${product.price}</strong> <strong></strong>
        </div>
      ))}
    </div>
  )
}

export default Products;

