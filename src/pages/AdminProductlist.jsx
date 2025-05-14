import React, { useEffect, useState } from 'react'

const AdminProductlist = () => {
    const [adminProduct,setAdminProduct]=useState("")
    useEffect(()=>{
const adminProoduct = JSON.parse(localStorage.getItem("admin_products"))
    setAdminProduct(adminProoduct)
    },[])
    
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Products Added by Admin</h2>
      { adminProduct.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid gap-4">
          {adminProduct.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-60 object-contain rounded mb-2"
                />
              )}
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
              <p className="text-green-700 font-bold mt-2"> ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductlist
