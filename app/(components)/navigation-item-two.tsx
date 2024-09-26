import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type ComponentInfo = {
  title: string;
  href: string;
  description: string;
};

const NavigationPackage = () => {

  const components: ComponentInfo[] = React.useMemo(() => [
    {
      title: "Bridal Couture",
      href: "/packages/bridal-couture",
      description: "Exclusive bridal couture with personalized consultations, fittings, and bespoke fabric selections to create your dream wedding gown.",
    },
    {
      title: "Ceremonial Attire",
      href: "/packages/ceremonial-attire",
      description: "Bespoke outfits for weddings, anniversaries, and other ceremonial events, designed to complement the theme and style of the occasion.",
    },
    {
      title: "Celebration Wardrobe",
      href: "/packages/celebration-wardrobe",
      description: "Tailored outfits for birthdays, parties, and special celebrations, crafted to make you stand out on your special day.",
    },
    {
      title: "Custom Design",
      href: "/packages/custom-design",
      description: "A fully personalized design experience, from concept to creation, bringing your unique vision to life with the finest materials.",
    },
    {
      title: "Signature Collection",
      href: "/packages/signature-collection",
      description: "Unique and personalized designs for special friends and loved ones, crafted to reflect their individuality and style.",
    },
    {
      title: "Milestone Moments",
      href: "/packages/milestone-moments",
      description: "Outfits designed to celebrate life's milestones, including graduations, anniversaries, and other achievements.",
    },
  ], []);
  
  

  return (
    <div className="bg-white">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger aria-expanded={false} className="text-lg rounded-none">Our products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-lg">Wako special</div>
                      <p className="text-sm leading-tight text-muted-foregroun font-sans">
                        Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Casual Collections" >
                Highlight curated collections of your designs, allowing customers to explore different styles and seasonal releases.
                </ListItem>
                <ListItem href="/docs/installation" title="Exclusive Pieces">
                Display unique, limited-edition, or one-of-a-kind products.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Ready-to-Wear">
                Present pre-made outfits that are available for immediate purchase without custom fittings.                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-lg rounded-none">Packages</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                <div className="text-lg rounded-none"> 
                Trending
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.memo(
  React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>( 
    ({ className, title, children, ...props }, ref) => {
      return (
        <li>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-lg font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-sans">{children}</p>
            </a>
          </NavigationMenuLink>
        </li>
      );
    }
  )
);

ListItem.displayName = "ListItem";

export default NavigationPackage;
