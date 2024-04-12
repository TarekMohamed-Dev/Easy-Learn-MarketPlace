"use client";
import React, { useContext, useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Presentation, ShoppingCart, MenuIcon } from "lucide-react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";
import { ModeToggle } from "./toggleMenu";
import { motion } from "framer-motion";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";

// Header component
function Header() {
  // Fetching user data using Clerk.js
  const { user } = useUser();
  // State to track user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to manage cart visibility
  const [openCart, setOpenCart] = useState(false);
  // Cart context
  const { cart, setCart } = useContext(CartContext);
  // State to track scroll position
  const [scrolled, setScrolled] = useState(false);

  // Effect to check if user is logged in
  useEffect(() => {
    setIsLoggedIn(window?.location?.href.toString().includes("sign-in"));
  }, []);

  // Effect to get user's cart items
  useEffect(() => {
    user && getCartItem();
  }, [user]);

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 170);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to fetch cart items for the user
  const getCartItem = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        res?.data?.data.forEach((citem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: citem.id,
              product: citem?.attributes?.products?.data[0],
            },
          ]);
        });
      }
    );
  };

  return (
    !isLoggedIn && (
      // Header container
      <header
        className={` ${scrolled ? "backdrop-blur-md bg-main-color/60 !text-slate-100 dark:bg-transparent" : ""} w-full fixed top-0 z-20 h-wrapper transition-all ease-in text-slate-800 dark:text-white border-b-[3px] border-slate-300 dark:border-indigo-400`}
      >
        {/* Header content */}
        <motion.div
          initial={{ y: "-2rem", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          viewport={{ once: true }}
          className="flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 !flex-nowrap   !justify-between "
        >
          {/* Logo with link to home */}
          <Link href="/">
            <h1
              className="flex items-center gap-2 font-bold md:text-xl pl-3 md:pl-0"
              dir="ltr"
            >
              <Presentation className="inline text-theme-color sm:w-[37px] sm:h-[37px]" />
              Easy Learn
            </h1>
          </Link>

          {/* Navigation links */}
          <div className="hidden xl:flex flex-1 items-center justify-end">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                    href="#"
                  >
                    Development
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                  >
                    Finance & Accounting
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                  >
                    IT & Software
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                  >
                    Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* User authentication and cart */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <h2
              className="flex gap-1 cursor-pointer"
              onClick={() => setOpenCart(!openCart)}
            >
              <ShoppingCart />
              <div> ({cart?.length})</div>
            </h2>
            {/* Check user authentication */}
            {!user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Sign-in link */}
                  <a
                    href="/sign-in"
                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-1 sm:px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Login
                    </span>
                  </a>
                  {/* Sign-up link */}
                  <a
                    href="/sign-up"
                    className="hidden sm:block relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Register
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              // User is logged in
              <div>
                {/* User button */}
                <UserButton afterSignOutUrl="/" />
                {/* Render cart if open */}
                {openCart && <Cart />}
              </div>
            )}

            {/* Dark mode toggle and Mobile menu */}
            <div className="flex">
              <ModeToggle />
              {/* Mobile menu */}
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
                      className={`${scrolled ? "text-slate-100" : "text-slate-900 dark:text-slate-400 transition-all ease-in-out duration-300"}`}
                    />
                  </IconButton>
                </MenuHandler>

                {/* Mobile menu items */}
                <MenuList className="absolute end-0 z-10 mt-2 w-56 rounded-md  bg-white dark:bg-main-color  shadow-lg">
                  <div>
                    <Link
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:dark:bg-gray-50 hover:text-gray-700"
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
  );
}

export default Header;
