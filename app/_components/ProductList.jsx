import React from 'react'
import ProductItem from './ProductItem'
function ProductList({productList}) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto gap-5'>
      {productList.map(item=>(
        <div key={item.id}><ProductItem product={item} /></div>
      ))}
    </div>
  )
}

export default ProductList