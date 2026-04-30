"use client";
import { useState } from "react";

export default function Mentor() {
  const [isMentorExpanded, setIsMentorExpanded] = useState(false);

  return (
    <section
      id="mentor"
      className="py-12 bg-white dark:bg-iot-dark"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mentor Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 rounded-2xl border border-gray-200 dark:border-iot-surface bg-gray-50 dark:bg-iot-surface/30 hover:border-iot-green hover:shadow-lg hover:shadow-iot-green/20 transition-all duration-300 items-start md:items-center">
          
          {/* Left Column - Clickable Info */}
          <div
            className="flex flex-col justify-center cursor-pointer group h-full relative z-10"
            onClick={() => setIsMentorExpanded(!isMentorExpanded)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setIsMentorExpanded(!isMentorExpanded);
            }}
          >
            <div className="mb-2">
              <div
                className="inline-block px-3 py-1 rounded-full bg-iot-green/10 border border-iot-green text-iot-green text-xs font-semibold mb-2"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Our Mentor
              </div>
              <h3
                className="text-2xl font-bold text-black dark:text-white mb-1"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Dr. Aftab Ahmed Ansari
              </h3>
              <p
                className="text-gray-600 dark:text-gray-400 text-sm font-medium"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Expert in Wind Energy Strategies & Smart Grids
              </p>
            </div>

            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${
                isMentorExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`transform transition-transform duration-700 ${
                  isMentorExpanded ? "translate-y-0" : "translate-y-10"
                }`}
              >
                <p
                  className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm text-justify md:text-left mt-3 border-t border-gray-200 dark:border-gray-700 pt-3"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  An accomplished engineer specializing in advanced control
                  strategies for wind energy systems. With multiple SCI Q1
                  publications and a Best Paper Award at EPREC-2021, he brings
                  deep expertise in renewable energy, EVs, and smart grids.
                  Skilled in OPAL-RT, Typhoon HIL, WAVECT controllers, and
                  MATLAB simulations, he combines hands-on DFIG experience with
                  a strong passion for innovation and sustainability.
                </p>
              </div>
            </div>

            <div
              className="mt-4 flex items-center text-sm text-iot-green font-semibold group-hover:underline decoration-2 underline-offset-4 transition-all select-none"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {isMentorExpanded ? "Show Less" : "Read Biography"}
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  isMentorExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Right Column - Image Card */}
          <div className="flex items-center justify-center md:justify-end w-full">
            <div className="relative w-full max-w-[200px] md:max-w-[240px] aspect-square rounded-2xl border-4 border-white dark:border-iot-surface/50 bg-white dark:bg-black/20 overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/assets/mentor.png"
                alt="Dr. Aftab Ahmed Ansari"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}