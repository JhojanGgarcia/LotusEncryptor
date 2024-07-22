"use client";

import "../../styles/scrollAnimations.css";
import "../../styles/animations.css";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { customCursorStyle } from "ipad-cursor";
import { motion } from "framer-motion";
import HeroText from "../HeroText";
import StarsCanvas from "../BgStars";
import SmokeBackground from "../SmokeBackground";
import React from "react";
import Header from "./Header";
import Link from "next/link";
export default function Hero() {
  const style = customCursorStyle({
    border: "1px solid #857ffa",
    scale: "1",
    radius: "15px",
    background: "rgba(133,127,250,0.2)",
  });
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.1,
          type: "spring",
          duration: 1,
          bounce: 0,
        },
        opacity: { delay: i * 0.3, duration: 0.5 },
      },
    }),
  };

  const handleClick = () => {
    {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }
  };

  return (
    <IPadCursorProvider>
      <StarsCanvas />
      <SmokeBackground />
      <section className="relative flex flex-col overflow-hidden max-w-5xl z-10 items-center justify-center h-screen w-screen">
        <Header />
        <div className="flex items-center justify-between">
          <div className="flex flex-col py-24 gap-2 items-center justify-center">
            <div className="flex  mt-24 relative text-white dark:text-lotus-primary-400 items-center justify-center text-3xl font-bold text-true-gray-800">
              <motion.div
                animate={{ y: [30, 5, 20], x: [0, 80, 0], rotate: [45] }}
                transition={{ ease: "easeOut", duration: 2 }}
                className=" w-96 blur-2xl slideindown  rotate-45 h-12  bg-lotus-primary-400 opacity-50 rounded-3xl absolute bottom-36 right-24"
              ></motion.div>

              <motion.div className=" w-96 blur-2xl  rotate-[60deg] h-12  bg-lotus-primary-400 opacity-50 rounded-3xl absolute bottom-20 right-44"></motion.div>
              <motion.div
                animate={{ y: [30, 5, 20], x: [0, -125, 0], rotate: [-45] }}
                transition={{ ease: "easeOut", duration: 2 }}
                className=" w-96 blur-2xl  -rotate-45 h-12  bg-lotus-primary-400 opacity-50 rounded-3xl absolute bottom-36 left-24"
              ></motion.div>

              <motion.div className=" w-96 blur-2xl  -rotate-[60deg] h-12  bg-lotus-primary-400 opacity-50 rounded-3xl absolute bottom-20  left-44"></motion.div>
              <strong data-cursor="text">L</strong>
              <motion.svg
                data-cursor="block"
                data-cursor-style={style}
                className={"drop-shadow-[rgba(133,127,250,1)_0px_0px_10px]"}
                aria-hidden="true"
                initial="hidden"
                preserveAspectRatio={"xMidYMid meet"}
                animate="visible"
                width="60"
                height="60"
                viewBox="0 0 256 256"
              >
                <motion.path
                  animate={{ rotate: [25, 360], fill: "rgba(133,127,250,0.4)" }}
                  custom={1}
                  variants={draw}
                  fill="#fff"
                  d="M245.83 121.63a15.53 15.53 0 0 0-9.52-7.33a73.5 73.5 0 0 0-22.17-2.22c4-19.85 1-35.55-2.06-44.86a16.15 16.15 0 0 0-18.79-10.88a85.5 85.5 0 0 0-28.55 12.12a94.6 94.6 0 0 0-27.11-33.25a16.05 16.05 0 0 0-19.26 0a94.5 94.5 0 0 0-27.11 33.25a85.5 85.5 0 0 0-28.55-12.12a16.15 16.15 0 0 0-18.79 10.88c-3 9.31-6 25-2.06 44.86a73.5 73.5 0 0 0-22.17 2.22a15.53 15.53 0 0 0-9.52 7.33a16 16 0 0 0-1.6 12.27c3.39 12.57 13.8 36.48 45.33 55.32S113.13 208 128.05 208s42.67 0 74-18.78c31.53-18.84 41.94-42.75 45.33-55.32a16 16 0 0 0-1.55-12.27M59.14 72.14a.2.2 0 0 1 .23-.15a70.4 70.4 0 0 1 25.81 11.67A118.7 118.7 0 0 0 80 119.17c0 18.74 3.77 34 9.11 46.28A123.6 123.6 0 0 1 69.57 140C51.55 108.62 55.3 84 59.14 72.14m3 103.35C35.47 159.57 26.82 140.05 24 129.7a59.8 59.8 0 0 1 22.5-1.17a129 129 0 0 0 9.15 19.41a142.3 142.3 0 0 0 34 39.56a115 115 0 0 1-27.55-12.01ZM128 190.4c-9.33-6.94-32-28.23-32-71.23C96 76.7 118.38 55.24 128 48c9.62 7.26 32 28.72 32 71.19c0 42.98-22.67 64.27-32 71.21m42.82-106.74A70.4 70.4 0 0 1 196.63 72a.2.2 0 0 1 .23.15c3.84 11.85 7.59 36.47-10.43 67.85a123.3 123.3 0 0 1-19.54 25.48c5.34-12.26 9.11-27.54 9.11-46.28a118.7 118.7 0 0 0-5.18-35.54M232 129.72c-2.77 10.25-11.4 29.81-38.09 45.77a115 115 0 0 1-27.55 12a142.3 142.3 0 0 0 34-39.56a129 129 0 0 0 9.15-19.41a59.7 59.7 0 0 1 22.49 1.19Z"
                />
              </motion.svg>
              <strong data-cursor="text ">TUS.</strong>
            </div>
          </div>
        </div>

        <div className="lg:2/6 xl:w-2/4  max-w-xs md:max-w-lg mx-auto  flex flex-col items-center justify-center text-center">
          <HeroText label="Protect" description="all your passwords." />
          <div
            data-cursor="text"
            className="mt-6 text-xl z-0 dark:text-black/80 text-white font-light text-true-gray-500 antialiased"
          >
            Gain expertise in industry-standard hashing and secure your
            passwords.
          </div>
          <Link
            href="/pages/encrypt"
            data-cursor="block"
            data-cursor-style={style}
            type="button"
            className="flex z-0 dark:text-black  text-nowrap gap-2 mt-10 h-12 animate-background-shine items-center justify-center rounded-2xl border border-lotus-primary-400/35 backdrop-blur-sm shadow-[0_0_15px_0_rgba(133,127,250,0.2)]  bg-[linear-gradient(110deg,transparent,45%,#857ffd,55%,transparent)] bg-[length:200%_100%] px-6 font-medium group text-white transition-colors "
          >
            <svg
              className="group-hover:scale-110 transition duration-300"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                fill="#857ffa"
                stroke="#857ffa"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                className="group-hover:scale-110 transition duration-300"
                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                fill="#857ffa"
                stroke="#857ffa"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                className="group-hover:rotate-12 transition duration-300"
                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                fill="#857ffa"
                stroke="#857ffa"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Encrypt Now
          </Link>
        </div>
        <div className="p-24 text-center">
          <span
            onClick={handleClick}
            data-cursor="block"
            data-cursor-style={style}
            type="button"
            className="border hidden md:flex border-lotus-primary-400/35 hover:shadow-[0_0_20px_0_rgba(133,127,250,0.1)] items-center justify-center p-2 rounded-xl animate-bounce   transition duration-300 ease-in-out"
          >
            <svg
            
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#fff"
              fill="none"
            >
              <path
              className="dark:stroke-black"
                d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </section>
    </IPadCursorProvider>
  );
}
