"use client";
import { featuresFeatures } from "../content/FeaturesContent";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import "../../styles/animations.css";
import React from "react";
import motion from "framer-motion";
import { customCursorStyle } from "ipad-cursor";

export default function Features() {
  const style = customCursorStyle({
    border: "1px solid #857ffa",
    scale: "1",
    radius: "20px",
    background: "rgba(133,127,250,0.2)",
  })
  const { setHoveredIcon } = useIPadCursor();

  const handleMouseEnter = (e) => {
    if (setHoveredIcon) {
      setHoveredIcon(e.target);
    }
  };
  const handleMouseLeave = () => {
    if (setHoveredIcon) {
      setHoveredIcon(null);
    }
  };
  return (
    <IPadCursorProvider>
    <section className="border-t border-white/10 dark:border-black/5 backdrop-blur-xl overflow-hidden w-screen z-10 rounded-3xl flex flex-col items-center justify-center">
    <div className='h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-lotus-primary-400 to-[rgba(17,17,17,0)] transition-all duration-1000' />
      <div className="rounded-3xl max-w-5xl z-10 py-24 mt-24">
        <div className="mx-auto px-4 text-center ">
          <div className="max-w-2xl mx-auto relative flex items-center justify-center flex-col">
            <h3 data-cursor="text" className="text-white dark:text-black relative text-3xl font-semibold sm:text-4xl">
              The fastest way to protect your passwords
              <div className="w-80 blur-3xl hidden md:flex h-12 rotate-45 bg-lotus-primary-400 opacity-50 rounded-3xl absolute top-0 left-0"></div>
              <div className="w-80 blur-3xl hidden md:flex h-12 -rotate-45 bg-lotus-primary-400 opacity-50 rounded-3xl absolute top-0 right-0"></div>
              <div className="w-80 blur-3xl -rotate-45 h-12 bg-lotus-primary-400 opacity-50 rounded-3xl absolute bottom-32 left-3/4"></div>
              <div className="w-80 blur-3xl rotate-45 h-12 bg-lotus-primary-400 opacity-50 rounded-3xl absolute bottom-32 right-3/4"></div>
            </h3>
            <p data-cursor="text" className="mt-6 dark:text-black/80 text-white/80">
              Lotus employs advanced encryption algorithms, incorporating
              techniques such as salting, peppering, secure hashing,{" "}
              <strong>key derivation functions (KDFs)</strong>, and a range of
              cryptographic standards including AES{" "}
              <strong>(Advanced Encryption Standard)</strong>, RSA{" "}
              <strong>(Rivest-Shamir-Adleman) </strong>, and ECC{" "}
              <strong>(Elliptic Curve Cryptography)</strong>.
            </p>
          </div>
        </div>
        <section className="mt-12 flex items-center justify-center">
          <ul className="grid gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuresFeatures.map((item, idx) => (
              <li
                key={idx}
                data-cursor-style={style}
                data-cursor="block"
                className={`group p-6 rounded-2xl shadow-lg group z-10 transition-all duration-500 ${
                  idx % 3 === 0
                    ? "row-span-2 bg-gradient-to-br from-lotus-primary-400/80 hover:rotate-6 to-lotus-primary-300/5"
                    : idx % 2 === 0
                    ? "bg-gradient-to-br from-lotus-secondary-400/80 hover:-rotate-6 to-secondary-300/5"
                    : "bg-gradient-to-br from-lotus-primary-700/5 hover:-rotate-2 to-lotus-secondary-500"
                }`}
                
                
              >

                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full group-hover:rotate-12 group-hover:text-white text-white/60 transition duration-300">
                  <span>{item.icon}</span>
                </div>
                <h4 className="text-xl text-center dark:text-black text-white font-bold group-hover:text-gray-200 dark:group-hover:text-white transition duration-300">
                  {item.title}
                </h4>
                <p className="text-center dark:text-black text-gray-100">{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
    </IPadCursorProvider>
  );
}

