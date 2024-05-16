"use client";
import AuthNavBar from "@/components/auth/auth-navbar";
import { Button } from "@/components/ui/button";
import initAOS from "@/utils/AosConfig";
import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const BanksPage = () => {
  React.useEffect(() => {
    initAOS();
  }, []);
  return (
    <main className="flex flex-col w-full">
      <AuthNavBar />
      <section
        className="flex flex-col justify-center space-y-4 w-full h-[50dvh] p-24"
        style={{
          backgroundImage: `url('/assets/image/hero_bank.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-aos="fade-up"
      >
        <h1 className="text-3xl text-left font-extrabold text-algoOrange font-paytone">
          Les Banques
        </h1>
        <p className="text-lg text-left text-white font-medium">
          Simplifier et sécuriser vos opérations
        </p>
      </section>
      <section className="p-24 flex justify-evenly items-center space-x-2">
        <div
          className="flex flex-col space-y-8 w-[40%] justify-center"
          data-aos="fade-left"
        >
          <h2 className="text-algoMarron dark:text-algoOrange text-3xl text-left font-extrabold font-paytone">
            Optimiser vos{" "}
            <span className="text-algoOrange dark:text-white">
              performances
            </span>{" "}
            sur les{" "}
            <span className="text-algoOrange dark:text-white">marchés</span>{" "}
            financiers
          </h2>
          <p className="text-left text-md">
            Une plateforme d`intermédiation, c est un espace spécialement conçu
            pour les institutions financières, notamment les banques, pour
            faciliter leurs opérations de vente et d échange de titres.
          </p>
          <div>
            <Button>
              C`est parti <BsArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <Image
          src="/assets/image/bank2.png"
          alt="Bank"
          width={700}
          height={700}
          className="object-cover"
          data-aos="fade-right"
        />
      </section>

      <section className="p-24 flex flex-col justify-center space-y-4 bg-gray-100">
        <h2 className="text-algoMarron dark:text-algoOrange text-3xl text-center font-extrabold font-paytone">
          A la découverte d
          <span className="text-algoOrange dark:text-white">ALGOWAY</span>
        </h2>
        <p className="text-center text-md">
          L importance de la fluidité, de la sécurité et de lefficacité dans le{" "}
          <br />
          monde financier est plus que capitale.
        </p>
        <div className="flex">
          <div
            className="flex items-end "
            style={{
              backgroundImage: `url('/assets/image/bank3.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="text-2xl text-white text-center font-extrabold font-paytone">
              Bilans
            </span>
          </div>
          <div>
            <div>

            </div>
            <div>
                
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BanksPage;
