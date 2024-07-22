"use client";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { customCursorStyle } from "ipad-cursor";
import { motion } from "framer-motion";
import "../../styles/globals.css";
import React, { useState } from "react";
import HeroText from "../../components/HeroText";
import StarsCanvas from "../../components/BgStars";
import SmokeBackground from "../../components/SmokeBackground";
import Header from "../../components/common/Header";
import Input from "../../components/Input";
import Switch from "../../components/Switch";
import { AnimatedText } from "../../components/AnimatedText";
import { encryptTypes } from "../../components/content/encryptContent";
import { Toaster, toast } from "sonner";
import "../../styles/animations.css";
import forge from "node-forge";
import CryptoJS from "crypto-js";
export default function Encrypt() {
  const [isTyping, setIsTyping] = useState("");
  const [isToggled, setIsToggled] = useState(
    Array.from({ length: 4 }, () => false)
  );

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [switchDisabled, setSwitchDisabled] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setEncrypted("");
    setIsTyping(value);
    setSwitchDisabled(false);
    setIsToggled(Array.from({ length: 4 }, () => false));

    if (!value.split(" ") === "") {
      setEncrypted("");
      setSwitchDisabled(false);
    }
  };

  const LinuxDots = () => {
    return (
      <div className="absolute flex gap-1 z-10 top-2 left-0 mx-5">
        <motion.div className="w-3 h-3 rounded-full bg-red-600/50"></motion.div>
        <motion.div className="w-3 h-3 rounded-full bg-yellow-600/50"></motion.div>
        <motion.div className="w-3 h-3 rounded-full bg-green-600/50"></motion.div>
      </div>
    );
  };

  const style = customCursorStyle({
    border: "1px solid #857ffa",
    scale: "1",
    radius: "15px",
    background: "rgba(133,127,250,0.2)",
  });
  const handleToggleTag = async (idx) => {
    const newToggledStates = isToggled.map((state, i) =>
      i === idx ? !state : false
    );
    const selectedTag = encryptTypes[idx].title;

    if (newToggledStates[idx]) {
      setIsToggled(newToggledStates);
      setSelectedAlgorithm(selectedTag);

      if (selectedAlgorithm !== selectedTag) {
        toast.success(`Using ${selectedTag}`);
        await handleEncrypt(selectedTag);
      } else {
        toast.info(`Using ${selectedTag}`);
      }
    } else {
      setIsToggled(newToggledStates);
      if (selectedAlgorithm === selectedTag) {
        setSelectedAlgorithm("");
        toast.info(`Unselected ${selectedTag}`);
        setEncrypted("");
      } else {
        toast.info(`Unselected ${selectedAlgorithm}`);
      }
    }
  };

  const handleEncrypt = async (algorithm) => {
    if (isTyping.trim() === "") {
      toast.error("There is nothing to encrypt");
      setEncrypted("");
      return;
    }
    if (!algorithm) {
      toast.error("Please select an algorithm");
      setEncrypted("");
      return;
    }

    const encryptPromise = new Promise((resolve, reject) => {
      let encryptedData = "";
      try {
        if (algorithm === "AES") {
          const key = forge.random.getBytesSync(32);
          const iv = forge.random.getBytesSync(16);
          const cipher = forge.cipher.createCipher("AES-CBC", key);
          cipher.start({ iv });
          cipher.update(forge.util.createBuffer(isTyping, "utf8"));
          cipher.finish();
          encryptedData = `iv:${forge.util.bytesToHex(
            iv
          )}|key:${forge.util.bytesToHex(key)}|data:${cipher.output.toHex()}`;
          resolve(encryptedData);
        } else if (algorithm === "KDF") {
          const salt = forge.random.getBytesSync(16);
          const key = forge.pkcs5.pbkdf2(isTyping, salt, 1000, 32, "sha256");
          encryptedData = `salt:${forge.util.bytesToHex(
            salt
          )}|key:${forge.util.bytesToHex(key)}`;
          resolve(encryptedData);
        } else if (algorithm === "RSA") {
          forge.pki.rsa.generateKeyPair(2048, (err, keypair) => {
            if (err) {
              reject(err);
            } else {
              const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
              const encrypted = keypair.publicKey.encrypt(isTyping, "RSA-OAEP");
              encryptedData = `key:${publicKeyPem}|data:${forge.util.encode64(
                encrypted
              )}`;
              resolve(encryptedData);
            }
          });
        } else if (algorithm === "SHA-512") {
          const hash = CryptoJS.SHA512(isTyping);
          encryptedData = hash.toString();
          encryptedData = `key:${encryptedData}`;
          resolve(encryptedData);
        } else {
          reject(new Error("Invalid algorithm"));
        }
      } catch (err) {
        reject(err);
      }
    });

    encryptPromise
      .then((res) => {
        setEncrypted(res);
        toast.success(`Encryption completed with ${algorithm}.`);
      })
      .catch((err) => {
        toast.error(`Error during encryption: ${err.message}`);
      });
  };

  const handleCopy = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setIsCopied(true);
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        setIsCopied(false);
        toast.error("Failed to copy to clipboard");
        console.error(err);
      });
  };
  return (
    <IPadCursorProvider>
      <StarsCanvas />
      <Toaster position="bottom-right" />
      <SmokeBackground />
      <div className="flex flex-col  max-w-7xl py-44 mx-auto text-center items-center justify-center min-h-screen overflow-x-hidden w-screen">
        <Header />
        <div className="max-w-[100rem] flex flex-col items-center justify-center space-y-4">
          <strong
            data-cursor="text"
            className="text-3xl relative z-10 max-w-lg text-white flex flex-wrap items-center justify-center"
          >
            <HeroText label="Encrypt" description="all the text you want." />
            <p className="text-xl dark:text-black/80 my-5 font-normal text-white/80">
              Write, encrypt, learn what makes the encryption offered by Lotus
              and ensure your passwords.
            </p>
          </strong>
        </div>
        <ul className="grid gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {encryptTypes.map((item, idx) => (
            <li
              key={idx}
              data-cursor-style={style}
              className={`group p-6 rounded-2xl q group z-10 transition-all duration-500 ${
                idx % 3 === 0
                  ? "row-span-2 bg-gradient-to-br from-lotus-primary-400/50  to-lotus-primary-300/5"
                  : idx % 2 === 0
                  ? "bg-gradient-to-br from-lotus-secondary-400/50  to-secondary-300/5"
                  : "bg-gradient-to-br from-lotus-primary-700/5 to-lotus-secondary-500/50"
              }`}
            >
              <h4 className="text-xl dark:text-black group-hover:text-lotus-primary-400 flex items-center gap-2 justify-center text-center text-white font-bold  transition duration-300">
                {item.title}
                <Switch
                  disabled={switchDisabled}
                  isToggled={isToggled[idx]}
                  onToggled={() => handleToggleTag(idx)}
                />
              </h4>
              <p
                data-cursor="text"
                className="text-center dark:text-black dark:font-bold  text-gray-100"
              >
                {item.name}
              </p>
              <p
                data-cursor="text"
                className="text-center dark:text-black text-gray-100"
              >
                {item.description}
              </p>
              <div
                className={`flex flex-col border justify-center  border-lotus-primary-400/35 shadow-[0_0_10px_rgba(133,127,250,0.5)]   ${
                  selectedAlgorithm === item.title
                    ? "border-lotus-primary-400 shadow-[0_0_10px_rgba(133,127,250,1)]"
                    : "pointer-events-none"
                } rounded-2xl my-6  bg-transparent`}
              >
                <div className="flex flex-col  p-3 justify-center">
                  {item.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center">
                      <div className=""></div>
                      <span className="text-gray-100 dark:text-black flex items-center relative  rounded-xl p-1   w-full text-nowrap text-left">
                        {tool}
                        <svg
                          className="dark:drop-shadow-[rgba(0,0,0,1)_0px_0px_5px]"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="#f5de19"
                            d="M18.774 19.7a3.73 3.73 0 0 0 3.376 2.078c1.418 0 2.324-.709 2.324-1.688c0-1.173-.931-1.589-2.491-2.272l-.856-.367c-2.469-1.052-4.11-2.37-4.11-5.156c0-2.567 1.956-4.52 5.012-4.52A5.06 5.06 0 0 1 26.9 10.52l-2.665 1.711a2.33 2.33 0 0 0-2.2-1.467a1.49 1.49 0 0 0-1.638 1.467c0 1.027.636 1.442 2.1 2.078l.856.366c2.908 1.247 4.549 2.518 4.549 5.376c0 3.081-2.42 4.769-5.671 4.769a6.58 6.58 0 0 1-6.236-3.5ZM6.686 20c.538.954 1.027 1.76 2.2 1.76c1.124 0 1.834-.44 1.834-2.15V7.975h3.422v11.683c0 3.543-2.078 5.156-5.11 5.156A5.31 5.31 0 0 1 3.9 21.688Z"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="w-full max-w-xl flex flex-col gap-4 items-center justify-center ">
          <Input value={isTyping} onChange={handleInputChange} />
          {encrypted &&
            (() => {
              const parts = encrypted.split("|");
              const dataObject = parts.reduce((acc, part) => {
                const [key, value] = part.split(":");
                acc[key] = value;
                return acc;
              }, {});

              const iv = dataObject.iv || "";
              const key = dataObject.key || "";
              const data = dataObject.data || "";
              const salt = dataObject.salt || "";
              return (
                <motion.div
                  className=" z-10 text-white p-4 rounded-lg  max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col space-y-4">
                    {selectedAlgorithm === "KDF" ? (
                      <motion.div
                        className={`dark:text-black   p-3 rounded-md`}
                      >
                        <div className="text-center relative">
                          <LinuxDots />

                          <motion.div
                            animate={{ x: [-200, 0] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                              damping: 10,
                            }}
                            className="border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl"
                          >
                            <strong className="block  text-sm">
                              KDF Encryption:
                            </strong>
                            <div className="mt-2">
                              KDF does not generate data.
                            </div>
                          </motion.div>
                          <motion.div
                            animate={{ x: [200, 0] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                              damping: 10,
                            }}
                            className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl"
                          >
                            <strong className="block relative text-sm">
                              Key:
                            </strong>
                            <div
                              onClick={() => handleCopy(key)}
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className="break-all p-4">
                              <AnimatedText text={key} />
                            </div>
                          </motion.div>
                          <motion.div className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl">
                            <strong className="block text-sm ">Salt:</strong>
                            <div
                              onClick={() => handleCopy(salt)}
                              data-cursor="block"
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className="break-all p-4">
                              <AnimatedText text={salt} />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      ""
                    )}
                    {selectedAlgorithm === "AES" ? (
                      <motion.div className="dark:text-black  p-3 rounded-md">
                        <div className="text-center relative">
                          <LinuxDots />
                          <motion.div
                            animate={{ x: [200, 0] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                              damping: 10,
                            }}
                            className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl"
                          >
                            <strong className="block text-sm">iv:</strong>
                            <div
                              onClick={() => handleCopy(iv)}
                              data-cursor="block"
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className=" p-4">
                              <AnimatedText text={iv} />
                            </div>
                          </motion.div>
                          <motion.div className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl">
                            <strong className="block text-sm ">key:</strong>
                            <div
                              onClick={() => handleCopy(key)}
                              data-cursor="block"
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className=" p-4">
                              <AnimatedText text={key} />
                            </div>
                          </motion.div>
                          <motion.div className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl">
                            <strong className="block text-sm ">data:</strong>
                            <div
                              onClick={() => handleCopy(data)}
                              data-cursor="block"
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  QQQQQQQQ
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className=" p-4">
                              <AnimatedText text={data} />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      ""
                    )}
                    {selectedAlgorithm === "RSA" ? (
                      <motion.div className="dark:text-black  p-3 rounded-md">
                        <div className="text-center relative">
                          <LinuxDots />
                          <motion.div className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl">
                            <strong className="block text-sm ">key:</strong>
                            <div
                              onClick={() => handleCopy(key)}
                              data-cursor="block"
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className="break-all p-4">
                              <AnimatedText text={key} />
                            </div>
                          </motion.div>
                          <motion.div className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl">
                            <strong className="block text-sm ">data:</strong>
                            <div
                              onClick={() => handleCopy(data)}
                              data-cursor="block"
                              className="absolute z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className="break-all p-4">
                              <AnimatedText text={data} />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      ""
                    )}
                    {selectedAlgorithm === "SHA-512" ? (
                      <motion.div className="dark:text-black  p-3 rounded-md">
                        <div className="text-center relative">
                          <LinuxDots />
                          <motion.div className="mt-2 relative border-lotus-primary-400/35 shadow-[0_0_20px_rgba(133,127,250,0.6)] p-3 rounded-2xl">
                            <strong className="block text-sm ">key:</strong>
                            <div
                              onClick={() => handleCopy(key)}
                              data-cursor="block"
                              className="absolute  z-10 top-2 right-2 p-2"
                            >
                              {!isCopied ? (
                                <svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              ) : (
                                <motion.svg
                                  className="text-white dark:text-black"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  color="#000000"
                                  fill="none"
                                >
                                  <path
                                    d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <motion.path
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 0.5,
                                      ease: "easeInOut",
                                      damping: 10,
                                    }}
                                    d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                    stroke="#857ffa"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                            <div className="break-all p-4">
                              <AnimatedText text={key} />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      ""
                    )}
                  </div>
                </motion.div>
              );
            })()}
        </div>
      </div>
    </IPadCursorProvider>
  );
}
