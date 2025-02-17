"use client";

import Image from "next/image";

interface HeroProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function Hero({ setIsModalOpen }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">
          Marathon national
          <br />
          de jeux vidéos
        </h1>
        <p className="hero-text">
          Vous aimez jouer ? Notre prochain évènement gaming est ouvert aux
          réservations... Places limitées !
        </p>
        <button
          className="button btn-modal"
          onClick={() => setIsModalOpen(true)}
        >
          je m'inscris
        </button>
      </div>
      <div className="hero-img">
        <Image
          src="/images/bg_img.jpg"
          alt="Image d'une femme tenant une manette de jeux dans sa main droite"
          width={400}
          height={400}
          priority
        />
      </div>
      <button className="button btn-modal" onClick={() => setIsModalOpen(true)}>
        je m'inscris
      </button>
    </section>
  );
}
