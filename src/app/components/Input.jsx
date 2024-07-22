"use client";
import React, { useRef, useState } from "react";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { customCursorStyle } from "ipad-cursor";
const Input = ({ value, onChange }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };


  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <IPadCursorProvider>
      <div className="relative z-10 w-full">
        <input
          data-cursor="text"
          ref={divRef}
          value={value}
          onChange={onChange}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          autoComplete="off"
          placeholder="Start typing..."
          type="text"
          className="h-12  w-full rounded-2xl border border-lotus-primary-400/35 bg-[transparent] backdrop-blur-sm p-3.5 text-white dark:text-black transition-colors duration-500 placeholder:select-none  placeholder:text-gray-500 focus:border-[#8678F9] focus:outline-none"
        />
        <input
          ref={divRef}
          style={{
            border: "1px solid #8678F9",
            opacity,
            WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full  rounded-2xl border border-[#8678F9] bg-[transparent] p-3.5 opacity-0  transition-opacity duration-500 placeholder:select-none"
        />
      </div>
    </IPadCursorProvider>
  );
};

export default Input;
