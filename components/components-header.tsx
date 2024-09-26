'use client';

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User,  Menu, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavigationPackage from "@/app/(components)/navigation-item-two";

export function HeaderComponent() {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showPackagesDropdown, setShowPackagesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur shadow-lg font-heading bg-white">
      <div className="container flex h-16 items-center justify-between mx-auto">
        {/* Branding */}
        <div className="font-heading">
            wkd 
        </div>
        <div>

        </div>
        <div className="flex flex-grow text-center md:text-left  justify-center gap-6">
          <div className="hidden md:flex">
            <NavigationPackage />
          </div>
          <form className="flex rounded-none">
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-[250px] md:w-[300px] lg:w-[350px] rounded-none"
            />
          </form>
        </div>

       
          <div className="">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 space-y-4 px-4 py-2">
          <div className="space-y-2">
            <button
              onClick={() => setShowProductsDropdown(!showProductsDropdown)}
              className="flex justify-between w-full text-left"
            >
              Products <ChevronDown className="h-5 w-5" />
            </button>
            {showProductsDropdown && (
              <div className="pl-4 space-y-1">
                <Link href="/products/category1" className="block text-sm">Category 1</Link>
                <Link href="/products/category2" className="block text-sm">Category 2</Link>
                <Link href="/products/category3" className="block text-sm">Category 3</Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowPackagesDropdown(!showPackagesDropdown)}
              className="flex justify-between w-full text-left"
            >
              Packages <ChevronDown className="h-5 w-5" />
            </button>
            {showPackagesDropdown && (
              <div className="pl-4 space-y-1">
                <Link href="/packages/package1" className="block text-sm">Package 1</Link>
                <Link href="/packages/package2" className="block text-sm">Package 2</Link>
                <Link href="/packages/package3" className="block text-sm">Package 3</Link>
              </div>
            )}
          </div>
          <Link href="/about" className="block text-sm">About Us</Link>
        </div>
      )}
    </header>
  );
}
