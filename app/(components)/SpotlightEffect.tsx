// SpotlightEffect.tsx
import React, { MouseEvent, useRef, useState } from 'react';
import Image from 'next/image';

export default function SpotlightEffect() {
  const boxWrapper = useRef<HTMLDivElement | null>(null);
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    setOverlayColor({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      ref={boxWrapper}
      className="group relative rounded-lg border-2 bg-black overflow-hidden w-fit mx-auto"
    >
      <div
        className="pointer-events-none absolute opacity-0 z-50 rounded-lg w-full h-full group-hover:opacity-100 transition duration-300"
        style={{
          background: `
            radial-gradient(
              250px circle at ${overlayColor.x}px ${overlayColor.y}px,
              rgba(255, 255, 255, 0.137),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative text-center z-10 px-0 py-16 rounded-lg w-fit bg-[url('/new-grid.png')] bg-cover bg-black h-full mx-auto">
        <Image
          src={'/chat.png'}
          alt="grid"
          width={600}
          height={600}
          className="mx-auto w-[85%]"
        />
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Create Group Effortlessly
        </h1>
        <p className="text-base pt-2 text-gray-300 capitalize">
          Seamless chats, crystal-clear videos, and <br />
          premium audio quality
        </p>
      </div>
    </div>
  );
}
