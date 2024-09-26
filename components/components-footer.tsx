'use client'

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function FooterComponent() {
  return (
    <footer className="w-full py-6 bg-background flex justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">About Us</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/about">
                  Our Story
                </Link>
              </li>
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/press">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Customer Service</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/shipping">
                  Shipping
                </Link>
              </li>
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/returns">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Policies</h3>
            <ul className="space-y-1">
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm text-muted-foreground hover:underline" href="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Connect</h3>
            <div className="flex space-x-3">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            © 2023 BrandName. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link className="text-sm text-muted-foreground hover:underline" href="#">
              Terms
            </Link>
            <Link className="text-sm text-muted-foreground hover:underline" href="#">
              Privacy
            </Link>
            <Link className="text-sm text-muted-foreground hover:underline" href="#">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}