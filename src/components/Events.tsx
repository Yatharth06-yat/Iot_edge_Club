"use client";

import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { eventsData, Event } from "@/lib/eventsData";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// UPCOMING EVENT RICH METADATA
// Keyed by event.id — add an entry here whenever a new upcoming event is added.
// The SlidingCarousel reads this to render the detailed hero slide instead of
// the generic title + description layout.
// Falls back to the generic layout if no matching key is found.
// ─────────────────────────────────────────────────────────────────────────────
const UPCOMING_META: Record<string, {
  clubLabel: string;       // e.g. "IOT Edge Club Presents"
  subtitle: string;        // italic tagline below the title
  date: string;            // display date string
  time: string;            // display time string
  fees: { label: string; price: string }[];          // entry fee rows
  levels: { label: string; title: string; desc: string }[]; // level breakdown
  gradient: string;        // Tailwind bg-gradient-to-br classes for the slide bg
}> = {
  // ── Secrets of Hogwarts ───────────────────────────────────────────────────
  // ⚠️  Change "secrets-of-hogwarts" to match the real event.id in eventsData
  "secrets-of-hogwarts": {
    clubLabel: "IOT Edge Club Presents",
    subtitle: "Unlock the Treasure Within Hogwarts!",
    date: "4 April 2026",
    time: "11 AM Onwards",
    fees: [
      { label: "Single", price: "₹39" },
      { label: "Duo", price: "₹69" },
    ],
    levels: [
      {
        label: "Level 1",
        title: "The Cipher Scroll",
        desc: "Decode magical words from famous series/movies to unlock the next level.",
      },
      {
        label: "Level 2",
        title: "The Blind Wizard's Trial",
        desc: "Guide a blindfolded teammate to solve puzzles and earn progression.",
      },
      {
        label: "Level 3",
        title: "The Treasure Hunt",
        desc: "Solve riddles and uncover hidden treasure within the college.",
      },
    ],
    gradient: "from-violet-950 via-purple-900 to-indigo-950",
  },
  // ── Edge Coding Competition ───────────────────────────────────────────────
  "coding-competition": {
    clubLabel: "IOT Edge Club Presents",
    subtitle: "Battle of the Brains: The Ultimate Code Sprint",
    date: "15 aug 2026",
    time: "10 AM - 4 PM",
    fees: [
      { label: "Solo Entry", price: "₹49" },
      { label: "Team (up to 3)", price: "₹129" },
    ],
    levels: [
      {
        label: "Round 1",
        title: "Logic & Algorithms",
        desc: "Solve 5 intense algorithmic challenges on HackerRank within 60 minutes.",
      },
      {
        label: "Round 2",
        title: "Hardware Integration",
        desc: "Write C++ code to successfully interact with a mystery sensor array.",
      },
      {
        label: "Final",
        title: "System Design",
        desc: "Architect and code a mini real-time IoT pipeline from scratch.",
      },
    ],
    gradient: "from-blue-900 via-sky-800 to-indigo-950",
  },
  // ── Add future upcoming events below in the same shape ───────────────────
};

export default function Events() {
  // ── Filter events by category ─────────────────────────────────────────────
  const upcomingEvents = eventsData.filter((e) => e.category === "Upcoming"); // UPCOMING events
  const previousEvents = eventsData.filter((e) => e.category === "Previous"); // PREVIOUS events
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <section id="events" className="py-20 bg-iot-light dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-iot-text dark:text-gray-100">
          Our Events
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-iot-green to-iot-green-dark mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Join us for workshops, hackathons, and tech talks. Connect with the
          community and level up your skills.
        </p>
      </div>

      <div className="space-y-20">

        {/* ── UPCOMING EVENTS SECTION ─────────────────────────────────────────── */}
        {/* Shows 1 event at a time in a large hero-style sliding carousel.        */}
        {/* If the event has an entry in UPCOMING_META it renders a rich detail    */}
        {/* card (title, subtitle, date/time, levels, fees); otherwise it falls    */}
        {/* back to the generic title + description overlay.                       */}
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            icon={<Calendar className="w-6 h-6 text-iot-green" />}
            title="Upcoming Events"
          />
          {/* SlidingCarousel: 1 item per view (full-width hero card) */}
          <SlidingCarousel events={upcomingEvents} labelPrefix="Event" />
        </div>
        {/* ── END UPCOMING EVENTS ─────────────────────────────────────────────── */}

        {/* ── PREVIOUS EVENTS SECTION ─────────────────────────────────────────── */}
        {/* Shows 5 events at a time on desktop, 1 on mobile.                     */}
        {/* Header is integrated inside PreviousEventsCarousel.                   */}
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PreviousEventsCarousel events={previousEvents} />
        </div>
        {/* ── END PREVIOUS EVENTS ─────────────────────────────────────────────── */}

      </div>
    </section>
  );
}

// ── Reusable section header with icon ────────────────────────────────────────
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-iot-green/10 dark:bg-iot-green/20 rounded-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-iot-text dark:text-white">
        {title}
      </h3>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UPCOMING EVENTS CAROUSEL
// Displays 1 event at a time as a large full-width hero slide.
// • If event.id exists in UPCOMING_META → renders rich detail layout
//   (gradient bg, club label, title, subtitle, date/time chips,
//    level breakdown grid, entry fee panel, CTA button)
// • Otherwise → falls back to the original generic layout
//   (event.image background, category badge, title, description)
// Supports: infinite loop, auto-slide every 5s, touch swipe, dot indicators.
// ─────────────────────────────────────────────────────────────────────────────
function SlidingCarousel({ events, labelPrefix }: { events: Event[]; labelPrefix?: string }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Clone first and last events for seamless infinite loop
  const extendedEvents = [
    events[events.length - 1], // clone of last → placed before first
    ...events,
    events[0],                 // clone of first → placed after last
  ];

  // When the transition reaches a clone, silently jump to the real counterpart
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      // Jumped past start clone → snap to real last item
      setIsTransitioning(false);
      setCurrentIndex(events.length);
    } else if (currentIndex === events.length + 1) {
      // Jumped past end clone → snap to real first item
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  // Re-enable CSS transition after a silent snap (needs a frame delay)
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => setCurrentIndex((prev) => prev + 1), []);
  const handlePrev = useCallback(() => setCurrentIndex((prev) => prev - 1), []);

  // Auto-slide every 5 seconds for upcoming events
  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, events.length]);

  // Touch / swipe support for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();       // swipe left  → next
    else if (distance < -50) handlePrev(); // swipe right → prev
  };

  // Empty state for upcoming events
  if (events.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center rounded-2xl bg-white dark:bg-iot-surface/30 border border-gray-200 dark:border-iot-surface border-dashed">
        <p className="text-gray-500 italic">No upcoming events found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[80vw] md:max-w-[90vw] mx-auto group">

      {/* ── Prev / Next buttons (outside the frame) ── */}
      {events.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); handlePrev(); }}
            className="absolute -left-6 md:-left-20 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface text-iot-dark dark:text-white shadow-lg border border-gray-100 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all z-30 transform scale-75 md:scale-100"
            aria-label="Previous upcoming event"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); handleNext(); }}
            className="absolute -right-6 md:-right-20 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface text-iot-dark dark:text-white shadow-lg border border-gray-100 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all z-30 transform scale-75 md:scale-100"
            aria-label="Next upcoming event"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* ── Carousel viewport (1 item visible at a time) ── */}
      <div
        className="relative w-full overflow-hidden shadow-2xl rounded-3xl bg-iot-surface"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Sliding track — translateX moves by 100% per slide */}
        <div
          className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
          onTransitionEnd={handleTransitionEnd}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {extendedEvents.map((event, index) => {
            // ── Check if this event has rich metadata ──────────────────────
            const meta = UPCOMING_META[event.id];

            return meta
              // ── RICH SLIDE (Hogwarts-style) ─────────────────────────────
              // Rendered when event.id matches a key in UPCOMING_META.
              // Shows: gradient bg, club badge, title, subtitle, date/time,
              //        level grid, entry fee panel, and CTA.
              ? (
                <div
                  key={`upcoming-rich-${event.id}-${index}`}
                  className={`min-w-full relative bg-gradient-to-br ${meta.gradient} overflow-hidden`}
                >
                  {/* Decorative radial glow layers */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.35)_0%,transparent_65%)] pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.25)_0%,transparent_65%)] pointer-events-none" />

                  <Link
                    href={`/events/${event.id}`}
                    className="relative z-10 flex flex-col w-full px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-14 cursor-pointer"
                  >
                    {/* Club badge + category chip */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                      <span className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full bg-white/20 text-white border border-white/20 backdrop-blur-md shadow">
                        {meta.clubLabel}
                      </span>
                      <span className="flex items-center gap-1.5 text-purple-200 text-[10px] sm:text-xs font-semibold bg-purple-900/40 px-3 py-1 rounded-full border border-purple-400/20 backdrop-blur-md">
                        <Calendar size={11} /> {event.category}
                      </span>
                    </div>

                    {/* Two-column layout on large screens */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                      {/* LEFT — title, subtitle, date/time, levels, CTA */}
                      <div className="flex-1 min-w-0">

                        {/* Event title */}
                        <h3
                          className="font-extrabold text-white leading-tight drop-shadow-xl tracking-tight mb-2 sm:mb-3
                            text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                          style={{ textShadow: "0 0 50px rgba(167,139,250,0.55)" }}
                        >
                          {event.title}
                        </h3>

                        {/* Subtitle / tagline */}
                        <p className="text-purple-200 italic font-medium mb-5 sm:mb-6 text-sm sm:text-lg md:text-xl">
                          {meta.subtitle}
                        </p>

                        {/* Date & time chips */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                          <span className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <Calendar size={13} className="text-purple-300" /> {meta.date}
                          </span>
                          <span className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <Clock size={13} className="text-purple-300" /> {meta.time}
                          </span>
                        </div>

                        {/* Level breakdown grid (shown only when levels exist) */}
                        {meta.levels.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">
                            {meta.levels.map((lvl) => (
                              <div
                                key={lvl.label}
                                className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-colors"
                              >
                                <span className="block text-[10px] sm:text-xs font-bold tracking-widest uppercase text-purple-300 mb-1">
                                  {lvl.label}
                                </span>
                                <span className="block text-white font-bold text-xs sm:text-sm mb-1 leading-snug">
                                  {lvl.title}
                                </span>
                                <span className="block text-purple-200/80 text-[11px] sm:text-xs leading-relaxed">
                                  {lvl.desc}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA button */}
                        <div className="inline-flex items-center gap-2 sm:gap-3 text-white font-bold transition-all bg-purple-600/60 hover:bg-purple-500/80 border border-purple-400/40 backdrop-blur-md rounded-full text-sm px-5 py-2.5 sm:text-lg sm:px-8 sm:py-3">
                          View Details <ArrowRight size={18} />
                        </div>
                      </div>

                      {/* RIGHT — entry fee panel (shown only when fees exist) */}
                      {meta.fees.length > 0 && (
                        <div className="lg:w-52 xl:w-60 shrink-0 bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-5 sm:p-6 self-start">
                          <div className="flex items-center gap-2 mb-4">
                            <Users size={15} className="text-purple-300" />
                            <span className="text-purple-200 text-[11px] font-bold tracking-widest uppercase">Entry Fee</span>
                          </div>
                          <div className="space-y-3">
                            {meta.fees.map((fee, i) => (
                              <div key={fee.label}>
                                <div className="flex items-center justify-between">
                                  <span className="text-white/70 text-sm">{fee.label}</span>
                                  <span className="text-white font-extrabold text-xl tracking-tight">{fee.price}</span>
                                </div>
                                {/* Divider between rows */}
                                {i < meta.fees.length - 1 && (
                                  <div className="w-full h-px bg-purple-400/20 mt-3" />
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 pt-4 border-t border-purple-400/20">
                            <p className="text-purple-200/60 text-[11px] text-center leading-relaxed">
                              Scan the QR code on the poster to register
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </Link>
                </div>
              )
              // ── GENERIC SLIDE (original layout) ─────────────────────────
              // Rendered when event.id has no entry in UPCOMING_META.
              // Shows: event.image background, category badge, date, title,
              //        description text, and CTA.
              : (
                <div
                  key={`upcoming-generic-${event.id}-${index}`}
                  className={`min-w-full h-[500px] md:h-[600px] relative ${event.image}`}
                >
                  <Link
                    href={`/events/${event.id}`}
                    className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16"
                  >
                    <div className="w-full max-w-5xl mx-auto">
                      <div className="max-w-4xl cursor-pointer">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          {/* Category badge */}
                          <span className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-lg bg-white/20 text-white border border-white/10 backdrop-blur-md">
                            {event.category}
                          </span>
                          {/* Date badge */}
                          <span className="flex items-center gap-2 text-gray-100 text-sm font-medium bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                            <Clock size={14} className="text-iot-green-dark" /> {event.date}
                          </span>
                        </div>

                        <h3 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
                          {event.title}
                        </h3>

                        <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-2xl mb-8 opacity-90 font-light leading-relaxed">
                          {event.description}
                        </p>

                        <div className="inline-flex items-center gap-3 text-white font-bold text-lg hover:gap-4 transition-all bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full backdrop-blur-md">
                          View Details <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
          })}
        </div>

        {/* ── Dot indicators (bottom-right) ── */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-16 flex gap-3 z-30">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.preventDefault(); setCurrentIndex(idx + 1); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${(currentIndex - 1 + events.length) % events.length === idx
                ? "w-12 bg-white"
                : "w-6 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to upcoming event ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PREVIOUS EVENTS CAROUSEL
// Displays 5 events at a time on desktop, 1 on mobile.
// Supports infinite loop and auto-slide every 5s.
// ─────────────────────────────────────────────────────────────────────────────
function PreviousEventsCarousel({ events }: { events: Event[] }) {
  // itemsPerView: 5 on desktop (≥768px), 1 on mobile
  const [itemsPerView, setItemsPerView] = useState(5);
  const clonesCount = 5;

  const [currentIndex, setCurrentIndex] = useState(clonesCount);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Empty state
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 italic">No previous events found.</p>
      </div>
    );
  }

  // ── Card UI Component ──
  const EventCard = ({ event }: { event: Event }) => (
    <Link href={`/events/${event.id}`} className="block h-full">
      <div className="relative h-80 w-full rounded-2xl overflow-hidden group/card cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10">
        <div className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110 ${event.image}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover/card:translate-y-0 transition-transform">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase bg-purple-600 rounded-full">
            Previous
          </span>
          <h4 className="text-sm md:text-2xl font-bold mb-2 leading-tight">
            {event.title}
          </h4>
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {event.date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  // ── If there are not enough events to form a carousel, just show a static grid ──
  const isCarousel = events.length > itemsPerView;

  if (!isCarousel) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center gap-3 mb-4 px-1">
          <div className="p-2 bg-iot-green/10 dark:bg-iot-green/20 rounded-lg text-iot-green dark:text-iot-green">
            <Clock size={24} />
          </div>
          <h3 className="text-2xl font-bold text-iot-text dark:text-white">Previous Events</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 px-2 md:px-4 w-full">
          {events.map((event, idx) => (
            <div key={`previous-static-${event.id}-${idx}`}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Carousel Logic (when events > itemsPerView) ──
  const filledEvents = [...events];
  while (filledEvents.length > 0 && filledEvents.length < clonesCount) {
    filledEvents.push(...events);
  }

  const displayEvents = [
    ...filledEvents.slice(-clonesCount),
    ...filledEvents,
    ...filledEvents.slice(0, clonesCount)
  ];
  const totalReal = filledEvents.length;

  const handleTransitionEnd = () => {
    if (currentIndex >= totalReal + clonesCount) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - totalReal);
    } else if (currentIndex < clonesCount) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + totalReal);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => setCurrentIndex((prev) => prev + 1), []);
  const handlePrev = useCallback(() => setCurrentIndex((prev) => prev - 1), []);

  useEffect(() => {
    if (displayEvents.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, displayEvents.length]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="p-2 bg-iot-green/10 dark:bg-iot-green/20 rounded-lg text-iot-green dark:text-iot-green">
          <Clock size={24} />
        </div>
        <h3 className="text-2xl font-bold text-iot-text dark:text-white">Previous Events</h3>
      </div>
      <div className="relative w-full group/prev">
        <div className="overflow-hidden rounded-2xl mx-0 md:mx-4">
          <div
            className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
            onTransitionEnd={handleTransitionEnd}
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {displayEvents.map((event, idx) => (
              <div
                key={`previous-${event.id}-${idx}`}
                className="shrink-0 px-2 md:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); handlePrev(); }}
          className="absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg z-20"
          aria-label="Previous events"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); handleNext(); }}
          className="absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg z-20"
          aria-label="Next events"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}