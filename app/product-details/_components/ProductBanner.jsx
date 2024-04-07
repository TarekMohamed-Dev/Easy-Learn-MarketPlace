import React from 'react'
import Image from 'next/image'

function ProductBanner({ product }) {
  const imageUrl = product?.attributes?.image?.data[0]?.attributes?.url;


  return (
    <div>
      {imageUrl ? (
        <Image src={imageUrl} alt='banner' width={400} height={300} priority className='rounded-lg max-h-[300px]' />
      ) : <div className='w-[400px] h-[240px] bg-slate-200 rounded-lg animate-pulse'></div>}

    </div>
  )
}

export default ProductBanner