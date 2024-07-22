"use client";
import React from "react";
import {motion} from "framer-motion";

export default function HeroText({ label, description }) {
  return (
    <motion.div
      data-cursor="text"
      className="text-6xl dark:text-black  z-0 text-white font-bold  leading-none"
    >
      <motion.strong
      initial={{ rotate: 0 }}
      whileInView={{ rotate: [10, -10, 10, -10, 10, -10, 10, -10, 10, -10, 0] }}
      transition={{ duration: 3, ease: "easeInOut"}}
      viewport={{ once: true }}
      className="bg-gradient-to-br  drop-shadow-[0_0_10px_rgba(33,30,67)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,1)] z-10 items-center justify-center relative from-lotus-primary-400/80 via-lotus-primary-200 to-lotus-primary-400 bg-clip-text text-transparent inline-flex ">
        {label} 
      </motion.strong>{" "}
    {description}
    </motion.div>
  );
}
