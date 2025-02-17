"use client";

import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero setIsModalOpen={setIsModalOpen} />
        <RegistrationForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </main>
      <Footer />
    </>
  );
}
