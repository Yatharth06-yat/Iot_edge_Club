"use client";

import { Github, Linkedin, Mail, ArrowLeft, ExternalLink, Code, Cpu, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DeveloperPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-iot-light dark:bg-[#020617] text-gray-900 dark:text-white selection:bg-iot-green/30 selection:text-iot-green">
      
      {/* ── BACKGROUND ORBS ─────────────────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-iot-green/10 dark:bg-iot-green/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-sm font-semibold hover:bg-iot-green hover:text-white transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Image Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-iot-green to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-iot-surface shadow-2xl">
              <Image
                src="/assets/team-img/yatharth.png"
                alt="Yatharth Gupta"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider">Available for Hire</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-iot-green font-bold tracking-widest uppercase text-sm mb-4">MERN Stack Developer | Technical Lead</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Yatharth <span className="bg-gradient-to-r from-iot-green to-blue-400 bg-clip-text text-transparent">Gupta</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10">
              A passionate developer focused on building scalable, responsive, and user-centric full-stack web applications. 
              I specialize in connecting powerful backend logic with seamless frontend experiences using the MERN stack.
              Currently leading the technical initiatives at IoT Edge Club while exploring RESTful API optimization and optimized database schemas.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <a 
                href="https://github.com/Yatharth06-yat" 
                target="_blank" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white hover:bg-gray-900 transition-all shadow-lg"
              >
                <Github size={20} /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/yatharth-gupta-525b40306/" 
                target="_blank" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0077B5] text-white hover:bg-[#006da5] transition-all shadow-lg"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
              <a 
                href="https://www.instagram.com/the_yatharth_056/" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-all shadow-lg"
              >
                <Globe size={20} /> Instagram
              </a>
            </div>

            {/* Expertise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ExpertiseCard 
                icon={<Code className="text-blue-500" />}
                title="MERN Stack"
                desc="MongoDB, Express, React, Node"
              />
              <ExpertiseCard 
                icon={<Cpu className="text-purple-500" />}
                title="IoT & Hardware"
                desc="Arduino, ESP32, C++, Python"
              />
              <ExpertiseCard 
                icon={<Globe className="text-green-500" />}
                title="UI/UX Design"
                desc="Responsive Design, Web Animations"
              />
            </div>
          </div>
        </div>

        {/* ── RECENT PROJECTS / CONTRIBUTIONS ─────────────────────────────────── */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Works</h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-white/10 mx-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectSummaryCard 
              title="AI Emergency Alert System"
              role="Lead Developer"
              desc="An AI-powered healthcare platform that detects emergencies in real-time through symptom analysis, voice input, and accident images. Includes doctor alerts and live ambulance tracking."
              tech={["React.js", "Node.js", "AI/ML", "Geolocation"]}
            />
            <ProjectSummaryCard 
              title="SwachhMap"
              role="Full-Stack Developer"
              desc="An interactive platform for reporting and tracking public cleanliness issues in real-time using location-based image uploads to improve urban hygiene."
              tech={["MongoDB", "Express", "React", "Node"]}
            />
            <ProjectSummaryCard 
              title="IoT Edge Official Portal"
              role="Lead Architect"
              desc="The central hub for IoT enthusiasts at MITS Gwalior. Features a glassmorphism UI, project showcases, and a dynamic community engine."
              tech={["Next.js 16", "Tailwind CSS", "Framer Motion"]}
            />
          </div>
        </div>

        {/* ── FOOTER SIGNATURE ────────────────────────────────────────────────── */}
        <footer className="mt-32 pt-8 border-t border-gray-200 dark:border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Designed & Built with ❤️ by Yatharth Gupta
          </p>
          <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </footer>
      </main>
    </div>
  );
}

function ExpertiseCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-left hover:border-iot-green/30 transition-all group">
      <div className="p-3 rounded-xl bg-white dark:bg-white/10 w-fit mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
}

function ProjectSummaryCard({ title, role, desc, tech }: { title: string; role: string; desc: string; tech: string[] }) {
  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 hover:shadow-2xl transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-iot-green bg-iot-green/10 px-2 py-1 rounded-md mb-2 inline-block">
            {role}
          </span>
          <h3 className="text-2xl font-bold group-hover:text-iot-green transition-colors">{title}</h3>
        </div>
        <div className="p-3 rounded-full bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={20} />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
        {desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-[10px] font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
