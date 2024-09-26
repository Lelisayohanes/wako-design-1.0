"use client"

import { HeaderComponent } from '@/components/components-header';
import { Cta } from '@/components/components-cta';
import { FooterComponent } from '@/components/components-footer';
import React, { useRef, useState } from 'react';
import SpotlightEffect from './(components)/SpotlightEffect';
import { BeerHeroComponent } from '@/components/components-beer-hero';

export default function LandingPage() {
  const boxWrapper = useRef<HTMLDivElement | null>(null);
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false); // State to control hover

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    setOverlayColor({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex flex-col min-h-screen mx-auto justify-center"
      ref={boxWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HeaderComponent />
      <main className="flex-1 relative">
        {/* Spotlight Effect Overlay */}
        {isHovered && (
          <div
            className="pointer-events-none absolute z-50 rounded-lg w-full h-full transition duration-300"
            style={{
              background: `radial-gradient(
                250px circle at ${overlayColor.x}px ${overlayColor.y}px,
                rgba(255, 255, 255, 0.137),
                transparent 80%
              )`,
            }}
          />
        )}
        <BeerHeroComponent/>
        <Cta />
      </main>
      <FooterComponent />
    </div>
  );
}
