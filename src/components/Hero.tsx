"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");
  const fullText = "Connect. Innovate. Automate.";

  // Typing animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Canvas stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2,
      d: Math.random() * 1,
    }));

    function draw() {
      if (!ctx) return;

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#fff";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.d;
        if (s.y > H) s.y = 0;
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-20">

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Glow */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Floating Images */}
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" alt="Arduino" width={80} height={80}
        className="absolute top-[10%] left-[5%] animate-float opacity-70" />

      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" width={80} height={80}
        className="absolute top-[10%] right-[5%] animate-float delay-200 opacity-70" />

      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JS" width={80} height={80}
        className="absolute bottom-[10%] left-[5%] animate-float delay-400 opacity-70" />

      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="ESP32 / Python" width={80} height={80}
        className="absolute bottom-[10%] right-[5%] animate-float delay-600 opacity-70" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4">
          IoT{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            EDGE
          </span>{" "}
          CLUB
        </h1>

        {/* Typing Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 h-10 mb-6">
          {text}
          <span className="animate-pulse">|</span>
        </p>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Join a community of innovators building real-world IoT systems,
          participating in hackathons, workshops, and cutting-edge research
          in Edge AI, Smart Systems, and Automation.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold shadow-xl hover:scale-105 transition">
            🚀 Join Now
          </button>
          <button className="px-8 py-3 border border-gray-500 hover:bg-gray-800 rounded-full text-gray-300 transition">
            Explore
          </button>
        </div>

        {/* Floating Mission Card */}
        <div className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl animate-float-slow">
          <h2 className="text-2xl text-blue-400 mb-3">Our Mission</h2>
          <p className="text-gray-300">
            Empowering students through hands-on IoT projects, workshops,
            and innovation in Edge Computing, AI, and Smart Systems.
          </p>
        </div>

      </div>

      {/* CUSTOM ANIMATIONS */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .delay-200 { animation-delay: 2s; }
        .delay-400 { animation-delay: 4s; }
        .delay-600 { animation-delay: 6s; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}