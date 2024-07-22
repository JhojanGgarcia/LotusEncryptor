"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SmokeBackground() {
  const canvasRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const particlesRef = useRef([]);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas && rendererRef.current && cameraRef.current) {
      const renderer = rendererRef.current;
      const camera = cameraRef.current;

      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.z = 5;
    scene.add(camera);
    cameraRef.current = camera;

    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(-1, 0, 1);
    scene.add(light);

    const textureLoader = new THREE.TextureLoader();
    const smokeTexture = textureLoader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
    );
    const material = new  THREE.MeshLambertMaterial({
      
      color: 0x7060f4,
      opacity: 0.3,
      depthWrite: false,
      map: smokeTexture,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(5, 5);
    const particles = [];

    for (let i = 0; i < 40; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      particle.rotation.z = Math.random() * Math.PI * 2;
      scene.add(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    animate();

    window.addEventListener("resize", handleResize);
  };

  const animate = () => {
    requestAnimationFrame(animate);

    const particles = particlesRef.current;
    const camera = cameraRef.current;

    particles.forEach((particle) => {
      const z = particle.rotation.z;
      particle.lookAt(camera.position);
      particle.rotation.z = z + 0.011;
    });

    rendererRef.current.render(sceneRef.current, camera);
  };

  useEffect(() => {
    init();
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      className="w-screen h-screen  blur-2xl z-0 fixed top-0"
      ref={canvasRef}
    />
  );
}
