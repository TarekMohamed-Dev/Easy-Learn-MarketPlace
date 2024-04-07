"use client";
import { useUser, UserButton } from '@clerk/nextjs'
import { Presentation, ShoppingCart, MenuIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from './Cart'
import Link from 'next/link'
import { ModeToggle } from './toggleMenu';
import { motion } from "framer-motion";

import {
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";

function Header() {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [openCart, setOpenCart] = useState(false)
    const { cart, setCart } = useContext(CartContext)
    useEffect(() => {
        setIsLoggedIn(window?.location?.href.toString().includes('sign-in'))
    }, [])

    useEffect(() => {
        user && getCartItem()
    }, [user])
    const getCartItem = () => {
        CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res => {
            console.log('res from cart item', res?.data?.data)
            res?.data?.data.forEach(citem => {
                setCart((oldCart) => [
                    ...oldCart,
                    {
                        id: citem.id,
                        product: citem?.attributes?.products?.data[0]
                    }
                ])
            })

        })
    }

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 170) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return !isLoggedIn && (
        <header className={` ${scrolled &&
            "backdrop-blur-md bg-main-color/60 !text-slate-100 dark:bg-transparent"
            } w-full fixed top-0 z-20 h-wrapper transition-all ease-in text-slate-800 dark:text-white border-b-[3px] border-slate-300 dark:border-indigo-400`}>
            <motion.div
                initial={{ y: "-2rem", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 1 }}
                viewport={{ once: true }} className="flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 !flex-nowrap   !justify-between">
                <Link href="/">
                    <h1 className="flex items-center gap-2 font-bold md:text-xl pl-3 md:pl-0" dir="ltr">
                        <Presentation className="inline text-theme-color sm:w-[37px] sm:h-[37px]" />
                        Easy Learn
                    </h1>
                </Link>

                <div className="hidden xl:flex flex-1 items-center justify-end">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link className=" dark:text-white hover:text-blue-500 dark:hover:text-orange-500" href="#">
                                    Development
                                </Link>
                            </li>

                            <li>
                                <a href="#" className=" dark:text-white hover:text-blue-500 dark:hover:text-orange-500">Business</a>
                            </li>

                            <li>
                                <a href="#" className=" dark:text-white hover:text-blue-500 dark:hover:text-orange-500">Finance & Accounting</a>
                            </li>

                            <li>
                                <a href="#" className=" dark:text-white hover:text-blue-500 dark:hover:text-orange-500">IT & Software</a>
                            </li>

                            <li>
                                <a href="#" className=" dark:text-white hover:text-blue-500 dark:hover:text-orange-500">Design</a>
                            </li>
                            <li>
                                <a href="#" className=" dark:text-white hover:text-blue-500 dark:hover:text-orange-500">Contact Us</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='flex items-center gap-2'>

                    {/* login  & rejester btn */}
                    <div>
                        {!user ?
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <a href="/sign-in" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-1 sm:px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                            Login
                                        </span>
                                    </a>

                                    <a href="/sign-up" className="hidden sm:block relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                            Register
                                        </span>
                                    </a>
                                </div>
                            </div>
                            :
                            // cart & user
                            <div className='flex items-center gap-5'>
                                <h2 className="flex gap-1 cursor-pointer">
                                    <ShoppingCart onClick={() => setOpenCart(!openCart)} />
                                    <div> ({cart?.length})</div>
                                </h2>
                                <UserButton afterSignOutUrl='/' />
                                {openCart && <Cart />}
                            </div>
                        }
                    </div>

                    {/* Dark Mode and menu */}
                    <div className='flex'>
                        <ModeToggle />
                        <Menu
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 25 },
                            }}
                        >
                            <MenuHandler className="flex items-center justify-center xl:hidden">
                                <IconButton
                                    variant="text"
                                    className="mx-1.5 md:mx-4 block rounded-full"
                                >
                                    <MenuIcon
                                        className={` ${scrolled
                                            ? "text-slate-100"
                                            : "text-slate-900 dark:text-slate-400 transition-all ease-in-out duration-300"
                                            }`}
                                    />
                                </IconButton>
                            </MenuHandler>

                            <MenuList className="absolute end-0 z-10 mt-2 w-56 rounded-md  bg-white dark:bg-main-color  shadow-lg">
                                <div >
                                    <Link
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:dark:b hover:text-gray-700"
                                        href="#"
                                    >
                                        Development
                                    </Link>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                                    >
                                        Business
                                    </a>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                                    >
                                        Finance & Accounting
                                    </a>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                                    >
                                        IT & Software
                                    </a>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                                    >
                                        Design
                                    </a>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </MenuList>
                        </Menu>
                    </div>

                </div>
            </motion.div>
        </header>
    )
}

export default Header

