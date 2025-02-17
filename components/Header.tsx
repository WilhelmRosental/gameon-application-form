"use client";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header id="myTopnav">
        <div className="header-logo">
          <Image alt="logo" src="/images/Logo.png" width={279} height={79} />
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <a className="link active" href="#">
                <span>Détails de l'évènement</span>
              </a>
            </li>
            <li>
              <a className="link" href="#">
                <span>À propos</span>
              </a>
            </li>
            <li>
              <a className="link" href="#">
                <span>Contact</span>
              </a>
            </li>
            <li>
              <a className="link" href="#">
                <span>Évènements passés</span>
              </a>
            </li>
          </ul>
        </nav>
        <div
          onClick={toggleMenu}
          className="btn-menu-burger"
          aria-roledescription="open menu"
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </header>

      <div className={`menu-container ${isMenuOpen ? "active" : ""}`}>
        <div className="close-menu" onClick={toggleMenu}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <ul>
          <li>
            <a href="#">Détails de l'évènement</a>
          </li>
          <li>
            <a href="#">À propos</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Évènements passés</a>
          </li>
        </ul>
      </div>
    </>
  );
}
