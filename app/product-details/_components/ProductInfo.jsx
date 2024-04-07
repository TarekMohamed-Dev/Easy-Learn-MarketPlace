'use client'
import React from 'react'
import { ShoppingCart, BadgeCheck, AlertOctagon } from 'lucide-react'
import SkeletonProductInfo from './SkeletonProductInfo'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApis from '../../_utils/CartApis'
import { useContext } from 'react'
import { CartContext } from '../../_context/CartContext'
function ProductInfo({ product }) {
  const { user } = useUser()
  const router = useRouter()
  const { cart, setCart } = useContext(CartContext)
  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in')
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.AddToCart(data).then(res => {
        console.log('cart created successfully', res.data.data)
        setCart(oldCart => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product
          }
        ])
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
  return (
    <div>
      {product?.id ?
        <div>
          <h2 className='text-[20px]'>{product?.attributes?.title}</h2>
          <h2 className='text-[15px] text-gray-400'>{product?.attributes?.category}</h2>
          <h2 className='text-[11px] mt-5'>{product?.attributes?.description}</h2>
          <h2 className='text-[11px] text-gray-500 flex items-center gap-2 mt-2'> {product?.attributes?.instantDelivery ? <BadgeCheck className='text-green-500 h-5 w-5' /> : <AlertOctagon className='text-red-500 h-5 w-5' />} Eligible Instant Delivery</h2>
          <div className='flex items-center gap-2'>
            <h2 className='text-[32px] text-primary mt-3'>${product?.attributes?.price}</h2>
            <h3 className='dark:text-neutral-900 line-through text-gray-500 text-md'>${product?.attributes?.oldprice}</h3>
          </div>

          <button onClick={handleAddToCart} className="flex gap-2 px-4 py-2 rounded-md bg-theme-color text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-theme-color">
            <ShoppingCart /> Add To Cart
          </button>
        </div>
        :
        <SkeletonProductInfo />
      }
    </div>
  )
}

export default ProductInfo