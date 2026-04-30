"use client";
import { useState } from "react";

const galleryItems = [
  {
    id: 1,
    src: "/assets/gallery/IMG_6494.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "/assets/gallery/IMG_6496.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "/assets/gallery/IMG_6497.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "/assets/gallery/IMG_6499.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "/assets/gallery/IMG_6500.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-2 row-span-1",
  },
  {
    id: 6,
    src: "/assets/gallery/IMG_6505.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-1 row-span-2",
  },
  {
    id: 7,
    src: "/assets/gallery/IMG_6508.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-1 row-span-1",
  },
  {
    id: 8,
    src: "/assets/gallery/IMG_6511.jpg",
    title: "Secrets of Hogwarts",
    event: "Event",
    date: "April 2026",
    span: "col-span-1 row-span-1",
  },
];

const eventColors: Record<string, string> = {
  Workshop: "bg-[#0CAFFF]/20 text-[#0CAFFF]",
  Hackathon: "bg-violet-500/20 text-violet-600 dark:text-violet-300",
  Talk: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300",
  Project: "bg-amber-500/20 text-amber-600 dark:text-amber-300",
  Event: "bg-rose-500/20 text-rose-600 dark:text-rose-300",
};

const placeholderGradients = [
  "from-[#0CAFFF]/20 to-[#1e3a8a]/40",
  "from-violet-900/40 to-[#0CAFFF]/10",
  "from-emerald-900/30 to-[#0EA5E9]/20",
  "from-amber-900/30 to-[#0CAFFF]/10",
  "from-[#1e3a8a]/40 to-emerald-900/20",
  "from-[#0CAFFF]/10 to-violet-900/30",
  "from-rose-900/30 to-[#0EA5E9]/20",
  "from-[#0EA5E9]/20 to-amber-900/20",
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<null | (typeof galleryItems)[0]>(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Event"];
  const filtered =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.event === filter);

  return (
    <section
      id="gallery"
      className="py-20 bg-gray-50 dark:bg-[#050505] relative overflow-hidden"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#0CAFFF 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-[#0CAFFF]" />
            <span className="text-[#0CAFFF] text-xs font-semibold uppercase tracking-widest">
              Moments
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Club{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #0CAFFF, #38BDF8)",
              }}
            >
              Gallery
            </span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-base max-w-xl">
            Snapshots from our workshops, hackathons, demos, and everything in
            between.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${filter === f
                  ? "bg-[#0CAFFF] text-black border-[#0CAFFF]"
                  : "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#0CAFFF]/50 hover:text-[#0CAFFF]"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px]">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className={`relative group rounded-xl overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-[#0CAFFF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#0CAFFF]/10 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Placeholder gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${placeholderGradients[idx % placeholderGradients.length]} flex items-center justify-center`}
              >
                <svg
                  className="w-10 h-10 text-[#0CAFFF]/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${eventColors[item.event]}`}>
                  {item.event}
                </span>
                <p className="text-white text-sm font-semibold mt-1 leading-tight">
                  {item.title}
                </p>
                <p className="text-gray-300 text-xs">{item.date}</p>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0CAFFF]/40 text-[#0CAFFF] text-sm font-semibold hover:bg-[#0CAFFF]/10 transition-all duration-200">
            View Full Gallery
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-[#0a0a0a]">
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0CAFFF]/10 to-[#1e3a8a]/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-[#0CAFFF]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="p-5 bg-white dark:bg-[#0a0a0a] flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${eventColors[lightbox.event]}`}>
                  {lightbox.event}
                </span>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mt-1">
                  {lightbox.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{lightbox.date}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-[#0CAFFF] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}