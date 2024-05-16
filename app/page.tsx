'use client'
import AuthNavBar from "@/components/auth/auth-navbar";
import Autoplay from "embla-carousel-autoplay"
import { LoginRegisterButton } from "@/components/auth/login-register-button";
import ThemeDropDown from "@/components/theme-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import initAOS from "@/utils/AosConfig";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  React.useEffect(() => {
    initAOS();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  return (
    <main className="flex flex-col w-full">
      <AuthNavBar />
      <section>
        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="bg-[#F6F7F1]">
            <CarouselItem className="flex items-center space-x-4 justify-evenly">
              <Image
                src="/assets/image/hero1.jpg"
                width={800}
                height={800}
                alt="Hero Image"
                className="object-cover "
                data-aos="fade-right"
              />
              <div className="w-80 flex flex-col space-y-4 items-end" data-aos="fade-left">
                <h1 className="text-algoMarron text-3xl text-right font-extrabold font-paytone">
                  Créez Votre Avenir Financier
                </h1>
                <p className="text-sm text-right">
                  Nous croyons en une approche sur mesure pour la gestion de
                  votre patrimoine.
                </p>
                <Button className="mt-4">Découvrir</Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex items-center space-x-4 justify-evenly">
              <div className="w-80 flex flex-col space-y-4 items-start" data-aos="fade-right">
                <h1 className="text-algoMarron text-3xl text-left font-extrabold font-paytone">
                  Des opportunités au-delà des Frontières
                </h1>
                <p className="text-sm text-left">
                  Explorons une stratégie d investissement qui reflète vos
                  objectifs financiers, votre tolérance au risque et votre
                  vision pour l avenir
                </p>
                <Button className="mt-4 bg-algoOrange text-algoMarron">
                  Explorer
                </Button>
              </div>
              <Image
                src="/assets/image/hero2.jpg"
                width={800}
                height={800}
                alt="Hero Image"
                className="object-cover"
                data-aos="fade-left"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-12 top-1/2 -translate-y-1/2" />
        </Carousel>
      </section>
    </main>
  );
}
