'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const beerCollections = [
  {
    title: 'Craft IPA Collection',
    description:
      'Discover our handcrafted IPA collection, featuring bold flavors and aromatic hops that will delight your taste buds.',
      src: "/images/right-side.png" ,
      link: '/collections/craft-ipa',
    color: '#FFA500',
  },
  {
    title: 'Seasonal Brews',
    description:
      'Experience the taste of the seasons with our limited edition brews, crafted to perfectly complement each time of year.',
      src: "/images/right-side.png" ,
      link: '/collections/seasonal',
    color: '#4CAF50',
  },
  // {
  //   title: 'Dark Ale Delights',
  //   description:
  //     'Indulge in the rich, complex flavors of our dark ale collection. From stouts to porters, we&aps;ve got your dark beer cravings covered.',
  //   src: '/placeholder.svg',
  //   link: '/collections/dark-ales',
  //   color: '#161616',
  // },
  {
    title: 'Wheat Beer Wonders',
    description:
      'Light, refreshing, and perfect for sunny days. Our wheat beer collection offers a crisp and smooth drinking experience.',
    src: "/images/right-side.png" ,
    link: '/collections/wheat-beers',
    color: '#F60002',
  },
  {
    title: 'Sour & Wild Fermentation',
    description:
      'For the adventurous palate, our sour and wild fermentation beers offer unique, tangy flavors that push the boundaries of traditional brewing.',
      src: "/images/right-side.png" ,
      link: '/collections/sour-wild',
    color: '#F7F7F7',
  },
]

export function BeerHeroComponent(): JSX.Element {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <ReactLenis root>
      <main className="bg-amber-900" ref={container}>
      <section className="relative text-amber-500 h-[90vh] w-full bg-amber-950 grid place-content-center overflow-hidden">
          {/* Left Image */}
          <div className="absolute left-0 top-0 h-full w-1/2">
            <Image
              src="/images/right-side.png" 
              alt="Left Overlay"
              layout="fill"
              objectFit="cover"
              className="object-cover mt-6 w-[500px] h-[300px]"
            />
          </div>

          {/* Right Image */}
          <div className="absolute right-0 top-0 h-full w-1/2">
            <Image
              src="/images/new-right.png"  // Replace with your left image path
              alt="Right Overlay"
              layout="fill"
              objectFit="cover"
              className="object-cover mt-6 w-[500px] h-[300px]"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B4513_1px,transparent_1px),linear-gradient(to_bottom,#8B4513_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] z-10">
            our design speaks your language <br /> Collections. Scroll down! 
          </h1>
        </section>

        <section className="text-amber-100 w-full bg-amber-950">
          {beerCollections.map((collection, i) => {
            const targetScale = 1 - (beerCollections.length - i) * 0.05
            return (
              <BeerCard
                key={`beer_${i}`}
                i={i}
                url={collection.src}
                src={collection.src}
                title={collection.title}
                color={collection.color}
                description={collection.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                link={collection.link}
              />
            )
          })}
        </section>

        <footer className="group bg-amber-950">
          <h1 className="text-[16vw] md:translate-y-16 lg:translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-amber-200 to-amber-600 bg-clip-text text-transparent transition-all ease-linear">
            WAKO DESIGN
          </h1>
          <div className="bg-amber-900 h-20 md:h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer>
      </main>
    </ReactLenis>
  )
}

interface BeerCardProps {
  i: number
  title: string
  description: string
  src: string
  url: string
  color: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  link: string
}

const BeerCard: React.FC<BeerCardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
  link,
}) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[90%] md:w-[70%] rounded-md p-6 md:p-10 origin-top"
      >
        <h2 className="text-2xl md:text-3xl text-center font-semibold text-amber-950">{title}</h2>
        <div className="flex flex-col md:flex-row h-full mt-5 gap-6 md:gap-10">
          <div className="w-full md:w-[40%] relative top-[10%]">
            <p className="text-sm md:text-base text-amber-950">{description}</p>
            <span className="flex items-center gap-2 pt-2">
              <Link
                href={link}
                className="text-amber-950 underline cursor-pointer hover:text-amber-800 transition-colors"
              >
                Explore Collection
              </Link>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-950"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          <div className="relative w-full md:w-[60%] h-48 md:h-full rounded-lg overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              <Image 
                fill 
                src={url} 
                alt={title} 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}