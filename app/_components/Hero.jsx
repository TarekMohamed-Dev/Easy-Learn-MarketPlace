"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from 'next/link'
function Hero() {
  return (


    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className='py-20 mx-auto text-center flex items-center justify-center flex-col items-center max-w-3xl h-screen '
    >
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'>
        Your marketplace for high-quality{' '}
        <span className='bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text'>
          digital assets
        </span>
        .
      </h1>
      <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
        Welcome to Easy Learn. Every asset on our
        platform is verified by our team to ensure our
        highest quality standards.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 mt-6'>
        <button className="shadow-[0px 4px 14px 0px rgba(157,0,255,39%)] hover:shadow-[0px 6px 20px rgba(157,0,255,23%)] hover:bg-[rgba(157,0,255,0.9)] px-8 py-2 bg-theme-color rounded-md text-white font-light transition duration-200 ease-linear"
        >
          Browse Trending

        </button>
        <button >
          Our quality promise &rarr;
        </button>
      </div>
      <div className='gradient absolute w-80 h-80 bg-theme-color/25 blur-[100px] right-[100px] -z-[1]' />
    </motion.div>
  )
}

export default Hero    