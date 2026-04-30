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

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5,
      d: Math.random() * 0.5 + 0.1,
      o: Math.random(),
    }));

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.o})`;
        ctx.fill();
        s.y += s.d;
        if (s.y > H) s.y = 0;
      });
      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen md:min-h-[120vh] flex flex-col items-center justify-start overflow-hidden pt-40 pb-24">

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Glow Effects - Scaled for mobile */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-80 md:h-80 bg-blue-500/10 blur-[60px] md:blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-purple-500/10 blur-[60px] md:blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Floating Images - Better desktop placement */}
      <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" alt="Arduino"
          className="absolute top-[25%] left-[12%] w-16 h-16 animate-float opacity-50" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++"
          className="absolute top-[30%] right-[12%] w-16 h-16 animate-float delay-200 opacity-50" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JS"
          className="absolute top-[55%] left-[15%] w-16 h-16 animate-float delay-400 opacity-50" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python"
          className="absolute top-[60%] right-[15%] w-16 h-16 animate-float delay-600 opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          IoT Edge Club MITS
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-5xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
          IoT{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            EDGE
          </span>{" "}
          CLUB
        </h1>

        {/* Typing Tagline */}
        <div className="h-10 mb-6 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-gray-300">
            {text}<span className="animate-blink">|</span>
          </p>
        </div>

     <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Join a community of innovators building real-world IoT systems,
          participating in hackathons, workshops, and cutting-edge research
          in Edge AI, Smart Systems, and Automation.
        </p>

     

      </div>

      <style jsx>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-200 { animation-delay: 1.5s; }
        .delay-400 { animation-delay: 3s; }
        .delay-600 { animation-delay: 4.5s; }
        .animate-blink { animation: blink 1s step-end infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
