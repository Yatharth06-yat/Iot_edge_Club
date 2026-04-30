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
      className={`z-50 flex justify-center w-full transition-all duration-300 ease-in-out ${
        isScrolled ? "fixed top-0 px-0" : "absolute top-4 px-3 sm:top-6 sm:px-4"
      }`}
    >
      <nav
        className={`w-full border border-white/50 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-w-full rounded-none border-x-0 border-t-0"
            : "max-w-7xl rounded-2xl"
        }`}
      >
        <div className="px-4 sm:px-6 py-2">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <div className="flex items-center min-w-0">
              <Link href="/" className="hover:scale-105 transition-transform duration-300">
                <Logo edgeColor="text-iot-green-deep dark:text-iot-green" />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                  className="px-4 py-2 rounded-full text-gray-800 dark:text-gray-200 text-sm font-bold tracking-wide transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-sm dark:hover:shadow-[0_0_15px_rgba(84,144,233,0.4)] hover:text-iot-green-deep dark:hover:text-iot-green border border-transparent hover:border-white/50 dark:hover:border-white/10"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right — theme + hamburger */}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                className="md:hidden p-2 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-[400px] opacity-100 mt-2 border-t border-white/10"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1 py-2">
              {navItems.map((item) => (
                <Link
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                  className="block px-4 py-3 text-center rounded-xl hover:bg-white/50 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 text-sm font-bold transition-colors"
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