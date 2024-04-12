"use client"; 
import ProductApis from "../../_utils/ProductApis"; 
import React, { useEffect, useState } from "react"; 
import ProductBanner from "../_components/ProductBanner"; 
import ProductInfo from "../_components/ProductInfo"; 
import ProductList from "../../_components/ProductList"; 
import { usePathname } from "next/navigation"; 
import BreadCrumb from "../../_components/BreadCrumb";

function ProductDetails({ params }) {
  // Using usePathname hook to get the current path
  const path = usePathname();

  // State variables to store product details and similar product list
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  // Fetching product details and similar product list when productId changes
  useEffect(() => {
    getProductById_();
  }, [params?.productId]);

  // Function to fetch product details by productId
  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId).then((res) => {
      setProductDetails(res.data.data);
      getProductListByCategory(res.data.data);
    });
  };

  // Function to fetch similar products by category
  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.attributes.category).then(
      (res) => {
        console.log(res?.data?.data);
        setProductList(res?.data?.data);
      }
    );
  };

  // Rendering product details and similar product list
  return (
    <div className="px-10 pt-20 pb-8  md:px-28">
      <BreadCrumb path={path} /> {/* Rendering BreadCrumb component */}
      <div className="grid justify-around grid-cols-1 lg:grid-cols-2 mt-10 sm:gap-0 ">
        {/* Rendering ProductBanner and ProductInfo components */}
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        {/* Rendering ProductList component */}
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails; // Exporting ProductDetails component
