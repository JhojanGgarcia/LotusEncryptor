// import React, { useRef } from "react";
// import Image from "next/image";
// import frameImg from "../../public/assets/images/frame.png";
// import frameVideo from "../../public/assets/videos/lotusFrame.mp4";

// export const Context = () => {
//   const videoRef = useRef();

//   return (
//     <section className="sm:py-32 py-20 sm:px-10 px-5">
//       <div className="mx-auto max-w-screen-xl relative">
//         <div className="mt-10 md:mt-20 mb-14">
//           <div className="relative h-full flex-center">
//             <div className="relative w-full h-full">
//               <Image
//                 src={frameImg}
//                 alt="frame"
//                 className="bg-transparent drop-shadow-[rgba(133,127,250,0.6)_0px_0px_50px] relative z-10"
//                 layout="responsive"
//                 width={100}
//                 height={100}
//               />
//               <div
//                 className="absolute inset-0 flex items-center justify-center overflow-hidden"
//                 style={{
//                   borderRadius: "5%",
//                 }}
//               >
//                 <video
//                   className="pointer-events-none"
//                   playsInline
//                   preload="none"
//                   muted
//                   autoPlay
//                   ref={videoRef}
//                   style={{
//                     width: "96%",
//                     height: "96%",
//                     borderRadius: "7%",
//                     objectFit: "cover",
//                   }}
//                 >
//                   <source src={frameVideo} type="video/mp4" />
//                 </video>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
