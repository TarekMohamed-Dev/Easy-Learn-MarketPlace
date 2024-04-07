import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PaymentConfirm() {
	return (
		<div className='flex flex-col items-center justify-center px-5 mt-20'>
			<Image src='/verified.gif'
				alt='check'
				width={130}
				height={130}
				
			/>
			<h2 className='text-[24px]'>Payment Successful !</h2>
			<h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
				order confirmation
				along with Digital Content</h2>
			<Link
				href="/"
				className='inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mt-4'>
				Go to Home</Link>

		</div>
	)
}

export default PaymentConfirm