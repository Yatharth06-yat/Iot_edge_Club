"use client";
import { Linkedin, Github, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const GAP = 24;

const teamMembers = [
  {
    name: "Yug Shrivastav",
    role: "President",
    image: "/assets/team-img/yug.png",
    github: "",
    linkedin: "#",
    bio: "IoT enthusiast focused on smart automation and embedded systems.",
  },
  {
    name: "Yatharth Gupta",
    role: "Technical Lead",
    image: "/assets/team-img/yatharth.png",
    github: "Yatharth06-yat",
    linkedin: "https://www.linkedin.com/in/yatharth-gupta-525b40306/",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  {
    name: "Priyanjal Paliwal",
    role: "Core Team",
    image: "/assets/team-img/PRIYANJAL PALIWAL.jpeg",
    github: "",
    linkedin: "#",
    bio: "Driven by curiosity and a desire to build the future of connectivity.",
  },

  {
    name: "Harshit Kadam",
    role: "Technical Lead",
    image: "/assets/team-img/harsit.png",
    github: "",
    linkedin: "#",
    bio: "Embedded systems expert with a focus on real-time sensor networks.",
  },
  {
    name: "Aman Sharma",
    role: "Technical Team",
    image: "/assets/team-img/aman.png",
    github: "",
    linkedin: "#",
    bio: "Specializing in hardware interfacing and efficient firmware development.",
  },
  {
    name: "Ananya Gupta",
    role: "Management",
    image: "/assets/team-img/ ANANYA GUPTA.jpg",
    github: "",
    linkedin: "#",
    bio: "Managing club operations and organizing tech workshops.",
  },
  {
    name: "Devansh Arora",
    role: "Technical Team",
    image: "/assets/team-img/DEVANSH ARORA.jpg",
    github: "",
    linkedin: "#",
    bio: "Passionate about hardware integration and firmware development.",
  },
  {
    name: "Ashwin Kumar",
    role: "Core Team",
    image: "/assets/team-img/Ashwin Kumar.jpg",
    github: "",
    linkedin: "#",
    bio: "Working on innovative IoT solutions and club outreach.",
  },
  {
    name: "Parinita Chhetri",
    role: "Design Lead",
    image: "/assets/team-img/PARINITA CHHETRI.jpg",
    github: "",
    linkedin: "#",
    bio: "Leading creative direction and visual design for club projects.",
  },
  {
    name: "Harsh Rajput",
    role: "Technical Team",
    image: "/assets/team-img/HARSH RAJPUT.jpg",
    github: "",
    linkedin: "#",
    bio: "Exploring the intersections of robotics and embedded systems.",
  },
  {
    name: "Mehak Khan",
    role: "Core Team",
    image: "/assets/team-img/MEHAK KHAN.webp",
    github: "",
    linkedin: "#",
    bio: "Contributing to the growth and connectivity of the IoT community.",
  },
  {
    name: "Ishu Singh Somvanshi",
    role: "Technical Team",
    image: "/assets/team-img/ ISHU SINGH SOMVANSHI.jpg",
    github: "",
    linkedin: "#",
    bio: "Focused on developing efficient and scalable IoT networks.",
  },
  {
    name: "Ojaswi Anand Sharma",
    role: "Management",
    image: "/assets/team-img/ OJASWI ANAND SHARMA.jpg",
    github: "",
    linkedin: "#",
    bio: "Coordinating events and fostering collaborative environments.",
  },
  {
    name: "Dilkash Khan",
    role: "Technical Team",
    image: "/assets/team-img/DILKASH KHAN.jpg",
    github: "",
    linkedin: "#",
    bio: "Hardware enthusiast with a knack for debugging complex circuits.",
  },
  {
    name: "Nitin Sharma",
    role: "Core Team",
    image: "/assets/team-img/NITIN SHARMA.jpg",
    github: "",
    linkedin: "#",
    bio: "Bridging the gap between theoretical concepts and practical IoT apps.",
  },
  {
    name: "Vipin Singh",
    role: "Technical Team",
    image: "/assets/team-img/Vipin Singh.png",
    github: "",
    linkedin: "#",
    bio: "Specializing in cloud connectivity and data management.",
  },
];

function computeCardWidth(availableWidth: number): { count: number; width: number } {
  if (availableWidth <= 0) return { count: 1, width: 280 };

  for (let n = 4; n >= 1; n--) {
    const w = (availableWidth - GAP * (n - 1)) / n;
    if (w >= 280) return { count: n, width: Math.floor(w) };
  }

  return { count: 1, width: Math.floor(availableWidth) };
}

export default function Team() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animatingRef = useRef(false);
  const rafIdRef = useRef<number>(0);
  const [cardWidth, setCardWidth] = useState(320);
  const cardWidthRef = useRef(320);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  const measureCards = useCallback(() => {
    if (!scrollRef.current) return;

    const containerW = scrollRef.current.clientWidth;
    const contentWidth = containerW - 32;

    setIsMobile(window.innerWidth < 768);

    const { width } = computeCardWidth(contentWidth);
    setCardWidth(width);
    cardWidthRef.current = width;
  }, []);

  useEffect(() => {
    measureCards();
    window.addEventListener("resize", measureCards);
    return () => window.removeEventListener("resize", measureCards);
  }, [measureCards]);

  const isPausedRef = useRef(false);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const startAnimation = useCallback(() => {
    if (animatingRef.current) return;

    animatingRef.current = true;
    const speed = 0.5;
    const scrollContainer = scrollRef.current;

    const animate = () => {
      if (!animatingRef.current) return;

      if (!isPausedRef.current && window.innerWidth >= 768 && scrollContainer) {
        scrollContainer.scrollLeft += speed;

        const singleSetWidth = teamMembers.length * (cardWidthRef.current + GAP);

        if (scrollContainer.scrollLeft >= 2 * singleSetWidth) {
          scrollContainer.scrollLeft -= singleSetWidth;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (scrollRef.current && !isMobile) {
      const singleSetWidth = teamMembers.length * (cardWidthRef.current + GAP);

      if (scrollRef.current.scrollLeft < singleSetWidth) {
        scrollRef.current.scrollLeft = singleSetWidth;
      }

      startAnimation();
    }

    return () => {
      animatingRef.current = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [cardWidth, isMobile, startAnimation]);

  const handleMobileNav = (direction: "left" | "right") => {
    setMobileIndex((prev) =>
      direction === "left"
        ? (prev - 1 + teamMembers.length) % teamMembers.length
        : (prev + 1) % teamMembers.length
    );
  };

  return (
    <section
      id="team"
      className="py-20 bg-gray-50 dark:bg-iot-dark/30"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Our Team
          </h2>

          <div className="w-20 h-1 bg-iot-green mx-auto mt-4 rounded-full"></div>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The team driving innovation and connectivity at MITS.
          </p>
        </div>

        {/* Desktop Carousel */}
        {!isMobile && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden pb-8"
              style={{ gap: `${GAP}px` }}
            >
              {extendedMembers.map((member, index) => (
                <TeamCard
                  key={index}
                  member={member}
                  width={cardWidth}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Carousel */}
        {isMobile && (
          <div className="relative">

            <TeamCard
              member={teamMembers[mobileIndex]}
              fullWidth
            />

            <button
              onClick={() => handleMobileNav("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => handleMobileNav("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function TeamCard({
  member,
  width,
  fullWidth = false,
}: {
  member: any;
  width?: number;
  fullWidth?: boolean;
}) {

  return (
    <div
      className={`group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-all ${fullWidth ? "w-full" : "shrink-0"
        }`}
      style={!fullWidth && width ? { width: `${width}px` } : undefined}
    >

      {/* Avatar */}
      <div className="relative w-32 h-32 mb-6">

        <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">

          {member.image && !member.image.includes("placeholder") ? (
            <Image
              src={member.image}
              alt={member.name}
              width={160}
              height={160}
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-2xl font-bold text-iot-green">
              {member.name.charAt(0)}
            </div>
          )}

        </div>
      </div>

      {/* Info */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {member.name}
      </h3>

      <p className="text-iot-green text-sm mb-4">
        {member.role}
      </p>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        {member.bio}
      </p>

      {/* Social Links */}
      <div className="flex gap-4">

        <a
          href={`https://github.com/${member.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-iot-green hover:text-black"
        >
          <Github size={18} />
        </a>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-iot-green hover:text-black"
        >
          <Linkedin size={18} />
        </a>

        <a
          href="mailto:contact@example.com"
          className="p-2 rounded-full bg-gray-100 hover:bg-iot-green hover:text-black"
        >
          <Mail size={18} />
        </a>

      </div>
    </div>
  );
}