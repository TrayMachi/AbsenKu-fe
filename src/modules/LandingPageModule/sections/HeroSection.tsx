"use client";
import { useEffect } from "react";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { LampContainer } from "../elements/Lamp";
import { motion } from "framer-motion";
import { Highlight } from "../elements/Highlight";
import { HeroCard } from "../elements/HeroCard";

export const HeroSection = () => {
  const router = useRouter();

  const fetchUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <LampContainer className="max-lg:h-[1300px] max-xl:h-[150vh] xl:h-[120vh]">
      <motion.section
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex xl:flex-row flex-col items-center justify-center mx-12 gap-16 mt-[15vh]"
      >
        <div className="flex flex-col gap-3 text-semibold text-3xl lg:text-6xl max-xl:items-center max-xl:text-center">
          <h1>
            Welcome to <span className="text-violet-400">AbsenKu</span>
          </h1>
          Make your attendance data
          <Highlight className="max-w-[590px]">Easy, Easier, Easiest</Highlight>
        </div>
        <HeroCard />
      </motion.section>
    </LampContainer>
  );
};
