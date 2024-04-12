import React, { useContext } from 'react';
import { CartContext } from '../_context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

function Cart() {
    // Accessing cart data from CartContext
    const { cart } = useContext(CartContext);

    return (
        // Cart component container
        <div className="h-auto max-h-[300px] w-[250px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto">
            {/* List of cart items */}
            <div className="mt-4 space-y-6">
                <ul className="space-y-4">
                    {/* Mapping through cart items */}
                    {cart?.map((item) => (
                        <CartItem key={item?.id} item={item} />
                    ))}
                </ul>
            </div>

            {/* Cart action buttons */}
            <div className="space-y-4 text-center mt-5">
                {/* Link to view cart */}
                <Link href="/cart" className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                    View my cart ({cart?.length})
                </Link>

                {/* Link to continue shopping */}
                <a href="/" className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600">
                    Continue shopping
                </a>
            </div>
        </div>
    );
}

function CartItem({ item }) {
    return (
        // Single cart item
        <li className="flex items-center gap-4">
            {/* Product image */}
            <Image src={item?.product?.attributes?.image?.data[0]?.attributes?.url} alt="image" className="rounded object-cover" width={70} height={70} />

            <div>
                {/* Product title */}
                <h3 className="text-sm text-gray-900 line-clamp-1">{item?.product?.attributes?.title}</h3>

                {/* Product details */}
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                        {/* Product category */}
                        <dt className="inline">Category: </dt>
                        <dd className="inline">{item?.product?.attributes?.category}</dd>
                    </div>

                    <div>
                        {/* Product price */}
                        <dt className="inline">Price: </dt>
                        <dd className="inline">{item?.product?.attributes?.price}</dd>
                    </div>
                </dl>
            </div>
        </li>
    );
}

export default Cart;
