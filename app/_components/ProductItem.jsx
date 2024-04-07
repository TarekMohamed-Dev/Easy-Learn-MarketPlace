import Image from "next/image";
import { List, Star } from 'lucide-react';
import Link from 'next/link';

const ProductItem = ({ product }) => {
    const imageUrl = product?.attributes?.image?.data[0]?.attributes?.url;
    const rating = product?.attributes?.rating;

    if (typeof rating !== 'number' || isNaN(rating) || rating <= 0) {
        return null; 
    }

    return (
        <div className='rounded shadow-lg hover:shadow-md transition-all duration-700 hover:scale-110'>
            <Link href={`/product-details/${product?.id}`} className=' cursor-pointer'>
                <Image src={imageUrl} alt="Product Image" width={400} height={350} className="rounded-t-lg h-[170px] w-full object-fit" />

                <div className='flex items-center justify-between p-3 rounded-b-lg bg-gray-50'>
                    <div className=''>
                        <h2 className='text-[12px] font-medium line-clamp-1 dark:text-neutral-900'>{product?.attributes?.title}</h2>

                        <div className='flex'>
                            {Array.from({ length: rating }).map((_, i) => (
                                <Star key={i} fill="#b4690e" strokeWidth={0} className="h-5" />
                            ))}
                        </div>
                        <h2 className='text-[10px] text-gray-400 flex  gap-1 items-center'>
                            <List className='w-4 h-4' /> {product?.attributes?.category}</h2>
                    </div>
                    <div>
                    <h2 className='dark:text-neutral-900'>${product?.attributes?.price}</h2>
                    <h3 className=' line-through text-gray-500 text-sm'>${product?.attributes?.oldprice}</h3>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default ProductItem;
