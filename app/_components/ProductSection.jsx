// Importing necessary modules and components
'use client'
import ProductApis from '../_utils/ProductApis'
import ProductList from './ProductList'
import { useEffect, useState } from 'react'

// ProductSection component
function ProductSection() {
  // State to store the latest product list
  const [productList,setProductList] = useState([])

  // Effect to fetch latest products on component mount
  useEffect(() => {
    getLatestProducts_()
  }, [])

  // Function to fetch latest products
  const getLatestProducts_ = () => {
    // Calling API to get latest products
    ProductApis.getLatestProducts().then(res => {
      // Updating product list state with fetched data
      setProductList(res.data.data)
    })
  }

  // Rendering component
  return (
    <div className='px-10 md:px-20'>
      {/* Section title */}
      <h2 className="my-4 text-xl">Our Latest Products</h2>
      {/* Rendering ProductList component with latest product data */}
      <ProductList productList={productList} />
    </div>
  )
}

// Exporting ProductSection component
export default ProductSection
