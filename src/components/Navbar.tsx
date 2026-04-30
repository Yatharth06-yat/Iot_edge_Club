"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["about", "events", "team", "blog", "gallery"];
      const scrollPosition = window.scrollY + 200;
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 100) {
        if (window.location.hash !== "") {
          window.history.replaceState(null, "", window.location.pathname);
        }
        return;
      }
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (window.location.hash !== `#${section}`) {
              window.history.replaceState(null, "", `#${section}`);
            }
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    window.history.pushState({}, "", href);
    if (elem) {
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navItems = ["About", "Events", "Team", "Blog", "Gallery"];

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full flex justify-center transition-all duration-500 ease-in-out ${
        isScrolled ? "px-0" : "px-4 pt-4 sm:pt-6"
      }`}
    >
      <nav
        className={`w-full transition-all duration-500 ease-in-out ${
          isScrolled
            ? "border-b border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-2xl"
            : "max-w-7xl mx-auto rounded-3xl border border-white/20 bg-black/20 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="px-4 sm:px-6 py-2">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center min-w-0">
              <Link href="/" className="hover:scale-105 transition-transform duration-300">
                <Logo edgeColor={isScrolled ? "text-iot-green-deep dark:text-iot-green" : "text-blue-400"} />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                  className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-white/10 hover:text-blue-400 ${isScrolled
                      ? "text-gray-800 dark:text-gray-200"
                      : "text-white"
                    }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right — theme + hamburger */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
                  }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                ? "max-h-[400px] opacity-100 mt-2 border-t border-white/10"
                : "max-h-0 opacity-0"
              }`}
          >
            <div className="flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <Link
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                  className={`block px-4 py-3 text-center rounded-xl text-sm font-bold transition-colors ${isScrolled
                      ? "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                      : "text-white hover:bg-white/10"
                    }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}