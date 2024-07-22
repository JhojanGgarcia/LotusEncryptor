import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { customCursorStyle } from "ipad-cursor";
import {motion} from "framer-motion";
export default function Switch({ isToggled, onToggled, onClick, icon, disabled }) {
  const style = customCursorStyle({
    border: "1px solid #857ffa",
    scale: "1",
    radius: "20px",
    background: "rgba(133,127,250,0.2)",
  });
  return (
    <IPadCursorProvider>
      <label
        data-cursor-style={style}
        data-cursor="block"
        className={`border flex items-center justify-center border-lotus-primary-400/35 relative  w-12 h-7 overflow-hidden rounded-full`}
      >
        <input
          disabled={disabled}
          type="checkbox"
          className="sr-only peer"
          checked={isToggled}
          onChange={onToggled}
          onClick={onClick}
        />
        <motion.p animate={{ x: isToggled ? 2 : -2, rotate: isToggled ? 45 : -0 }} className={`absolute ${isToggled ? "left-0" : "right-0"}`}>{icon}</motion.p>
        <span
          className={`w-5 h-5 flex items-center justify-center bg-lotus-primary-200 shadow-[0_0px_15px_rgba(133,_127,_250,_1)] absolute rounded-full left-1 top-[3px] peer-checked:bg-lotus-primary-400 peer-checked:left-[1.5rem] transition-all duration-300`}
        />
      </label>
    </IPadCursorProvider>
  );
}
