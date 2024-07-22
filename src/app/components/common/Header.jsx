"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderContent } from "../content/HeaderContent";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { customCursorStyle } from "ipad-cursor";
import SwitchTheme from "../SwitchTheme";
import Switch from "../Switch";
import { motion } from "framer-motion";

export default function Header() {
  const style = customCursorStyle({
    border: "1px solid #857ffa",
    scale: "1",
    radius: "10px",
    background: "rgba(133,127,250,0.2)",
  });
  const [navOpen, setNavOpen] = useState(false);

  const handleMouseEnter = () => {
    setNavOpen(true);
  };

  const handleMouseLeave = () => {
    setNavOpen(false);
  };


  return (
    <IPadCursorProvider>
      <header className="max-w-lg rounded-2xl pointer-events-auto  backdrop-blur-xl shadow-[0_0px_15px_rgba(133,_127,_250,_0.2)] top-0 absolute z-10 p-2 border-lotus-primary-400/20  my-5  flex items-center justify-center border">
        <nav className="flex items-center justify-center gap-4">
          {HeaderContent.map((icon, index) => (
            <Link
              href={icon.route}
              onMouseEnter={handleMouseEnter} q
              onMouseLeave={handleMouseLeave}
              key={index}
              data-cursor="block"
              data-cursor-style={style}
              className="flex  items-center justify-center"
            >
              {icon[Object.keys(icon)[2]]}
            </Link>
          ))}

          <SwitchTheme />
        </nav>
      </header>
    </IPadCursorProvider>
  );
}
